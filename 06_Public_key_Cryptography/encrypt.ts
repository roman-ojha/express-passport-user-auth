import crypto from "crypto";

// 1. Encrypting Data
// Function to Encrypt the data using Public key
function encryptWithPublicKey(publicKey: string, message: string) {
  const bufferMessage = Buffer.from(message, "utf8");

  return crypto.publicEncrypt(publicKey, bufferMessage);
}

// 2. Encrypting Digital Signature or Identities
// Function to encrypt the message using Private key
function encryptWithPrivateKey(privateKey: string, message) {
  const bufferMessage = Buffer.from(message, "utf8");
  return crypto.privateEncrypt(privateKey, message);
}

export { encryptWithPublicKey, encryptWithPrivateKey };
