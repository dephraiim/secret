function bufferToBase64(buf: ArrayBuffer): string {
  const arrayBufferView = new Uint8Array(buf);
  const numberArray = Array.from(arrayBufferView);
  return btoa(String.fromCharCode.apply(null, numberArray));
}

function base64ToBuffer(b64: string) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export async function generateKey() {
  return crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function exportCryptoKey(key: CryptoKey) {
  const exported = await crypto.subtle.exportKey(
    "raw", // format
    key // the key you want to export
  );
  return bufferToBase64(exported); // Convert the exported key to Base64 for storage
}

export async function importCryptoKey(base64Key: string) {
  const rawKey = base64ToBuffer(base64Key); // Convert Base64 string back to ArrayBuffer
  return await crypto.subtle.importKey(
    "raw", // format
    rawKey, // the key in ArrayBuffer format
    {
      // algorithm details
      name: "AES-GCM",
      length: 256,
    },
    false, // whether the key is extractable
    ["encrypt", "decrypt"] // the use of the key
  );
}

export async function encrypt(text: string, key: CryptoKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data
  );

  return {
    encryptedData: bufferToBase64(encrypted),
    iv: bufferToBase64(iv),
  };
}

export async function decrypt(
  encryptedData: string,
  key: CryptoKey,
  iv: string
) {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64ToBuffer(iv),
    },
    key,
    base64ToBuffer(encryptedData)
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// // Example usage
// (async () => {
//   const key = await generateKey();
//   const message = "Hello, world!";
//   const { encryptedData, iv } = await encrypt(message, key);

//   console.log("Encrypted:", encryptedData, "IV:", iv);

//   const decryptedMessage = await decrypt(encryptedData, key, iv);
//   console.log("Decrypted:", decryptedMessage);
// })();
