"use server";

import {
  decrypt,
  encrypt,
  exportCryptoKey,
  generateKey,
  importCryptoKey,
} from "@/lib/encrypt";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function encryptAction(prevState: any, formData: FormData) {
  console.log("encrypting");

  const schema = z.object({
    secret: z.string().nullish(),
    reads: z.coerce.number().nullish(),
    ttl: z.coerce.number().nullish(),
  });

  const data = schema.parse(Object.fromEntries(formData.entries()));

  const decryptedKey = await importCryptoKey(process.env.ENCRYPTION_KEY!);

  const { encryptedData, iv } = await encrypt(data.secret || "", decryptedKey);

  const dataToStore = {
    encryptedData,
    iv,
    reads: data.reads,
    ttl: data.ttl,
  };

  console.log(dataToStore);

  //  Encrypt the data
  //  Store it in redis with an id
  //  Return the id
  //  show a component with the id

  //   const decryptedMessage = await decrypt(encryptedData, decryptedKey, iv);
  //   console.log("Decrypted:", decryptedMessage);

  return {
    encrypted: true,
    id: "12345",
  };
}
