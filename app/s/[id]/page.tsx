import React from "react";
import { redis } from "@/lib/redis-client";
import { decrypt, importCryptoKey } from "@/lib/encrypt";
import { redirect } from "next/navigation";

export default async function Decrypt({ params }: { params: { id: string } }) {
  const secret = await redis.hgetall(`secret:${params.id}`);
  const expired = await redis.sismember("expired", params.id);

  if (expired) {
    redirect("/?expired=true");
  }

  if (parseInt(secret.reads) === 0 || parseInt(secret.reads) < 1) {
    await redis.sadd("expired", params.id);
    await redis.del(`secret:${params.id}`);

    redirect("/");
  } else {
    await redis.hincrby(`secret:${params.id}`, "reads", -1);
  }

  const decryptionKey = await importCryptoKey(process.env.ENCRYPTION_KEY!);

  const decryptedMessage = await decrypt(
    secret.encryptedData,
    decryptionKey,
    secret.iv
  );

  return (
    <div className="grow">
      <pre>{JSON.stringify(decryptedMessage, null, 2)}</pre>
      <p>Reads left: {secret.reads}</p>
    </div>
  );
}
