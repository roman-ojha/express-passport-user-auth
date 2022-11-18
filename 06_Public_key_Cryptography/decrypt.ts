import crypto from "crypto";

// 1. Decrypting Data
// Function to Decrypt the data using private key
function decryptWithPrivateKey(privateKey: string, encryptedMessage: Buffer) {
  return crypto.privateDecrypt(privateKey, encryptedMessage);
}

// 2. Decrypt Digital Signature or Identities
// Function to Decrypt the message using public key
function decryptWithPublicKey(publicKey: string, encryptedMessage: Buffer) {
  return crypto.publicDecrypt(publicKey, encryptedMessage);
}

export { decryptWithPrivateKey, decryptWithPublicKey };
