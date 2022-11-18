import crypto from "crypto";
import { decryptWithPrivateKey, decryptWithPublicKey } from "./decrypt";
import fs from "fs";

// Data that this receiver can access and verify it
import receivedData from "./signMessage";

// Now we need a public key to verify the data
// NOTE that this receivedData can be public

// now we know the algorithm that make the data hashed
// so we will use that algorithm again to hash the original data that we get
const hash = crypto.createHash(receivedData.algorithm);
const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest("hex");

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

// now here we will get the data that sender signed and decrypt it
const decryptedMessage = decryptWithPublicKey(
  publicKey,
  receivedData.signedAndEncryptedData
);
// here we will get the hashData after we decrypted message

// Verifying the hash data that we created from the original data and the hash value that we decrypt
// If it verify we can say that the Data that got hashed had not been tempered by another third party and also we can say that data is signed by the sender
const decryptedMessageHex = decryptedMessage.toString();

if (hashOfOriginalHex === decryptedMessageHex) {
  console.log(
    "Success ! the data has not been tempered with and the sender is valid"
  );
} else {
  console.log("Uh no... someone is trying to manipulate the data");
}
