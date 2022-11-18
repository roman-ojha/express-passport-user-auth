import crypto from "crypto";

// 1. Decrypting Data
// Function to Decrypt the data using private key
function decryptWithPrivateKey(privateKey: string, encryptedMessage: Buffer) {
  return crypto.privateDecrypt(privateKey, encryptedMessage);
}

export { decryptWithPrivateKey };
