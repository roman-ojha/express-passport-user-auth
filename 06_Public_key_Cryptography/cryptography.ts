const crypto = require("crypto");
import fs from "fs";

// Function to generate 'public' and 'private' key using the Elliptic curve cryptography under the hood
function genKeyPair() {
  // Generate an object where the keys are stored in properties 'publicKey' and 'privateKey'
  const keyPair = crypto.generateKeyPairSync("rsa", {
    // using RSA algorithm
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // Public key crypto standards 1
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // Public key crypto standards 1
      format: "pem", // Most common formatting choice
    },
  });

  const privateKey = keyPair.privateKey;
  const publicKey = keyPair.publicKey;
  console.log(publicKey);
  console.log(privateKey);

  // Storing the public key file
  fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey);

  // Storing the Private key file
  fs.writeFileSync(__dirname + "/id_rsa_priv.pem", privateKey);
}

export default genKeyPair;
