"use server";

import { encrypt, importCryptoKey } from "@/lib/encrypt";
import { ZodError, z } from "zod";
import { nanoid } from "nanoid";
import { redis } from "@/lib/redis-client";

export async function encryptAction(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      secret: z.string().min(1, { message: "Please enter a valid secret" }),
      reads: z.coerce
        .number()
        .int()
        .min(0, { message: "Please enter a valid number of reads." }),
      ttl: z.coerce.number(),
      time: z.enum(["minutes", "hours", "days"]),
    });

    const data = schema.parse(Object.fromEntries(formData.entries()));
    const TTL = data.ttl;

    const decryptedKey = await importCryptoKey(process.env.ENCRYPTION_KEY!);
    const { encryptedData, iv } = await encrypt(data.secret, decryptedKey);

    const id = nanoid(12);
    const dataToStore = {
      encryptedData,
      iv,
      reads: data.reads,
    };

    const expiry =
      data.time === "minutes"
        ? TTL * 60
        : data.time === "hours"
        ? TTL * 60 * 60
        : data.time === "days"
        ? TTL * 60 * 60 * 24
        : 0;

    await redis.hmset(`secret:${id}`, dataToStore);
    await redis.expire(`secret:${id}`, expiry);

    //   const decryptedMessage = await decrypt(encryptedData, decryptedKey, iv);
    //   console.log("Decrypted:", decryptedMessage);

    return {
      encrypted: true,
      id,
      error: null,
    };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        encrypted: false,
        id: "",
        error: error.errors, // error.flatten(),
      };
    }

    return {
      encrypted: false,
      id: "",
      error: "Something went wrong",
    };
  }
}
