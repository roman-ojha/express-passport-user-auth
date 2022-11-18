import crypto from "crypto";

// 1. Encrypting Data
// Function to Encrypt the data using Public key
function encryptWithPublicKey(publicKey: string, message: string) {
  const bufferMessage = Buffer.from(message, "utf8");

  return crypto.publicEncrypt(publicKey, bufferMessage);
}

export { encryptWithPublicKey };
