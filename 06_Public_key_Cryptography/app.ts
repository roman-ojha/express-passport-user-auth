/*
    => To implement the Passport JWT strategy, or JWT strategy we in general don't need pubic key cryptography
    => another way could be we can use a symmetric cryptography scheme where you just use a long secret key to authenticate on JWT
    => But we will going to use public key or asymmetric cryptography
 */

/*
    *) Type of Cryptography:
        1. Symmetric cryptography
            -> using single key
        2. Asymmetric cryptography
            -> it is a public key cryptography
            -> contain private and public key pair and they are linked
            -> public key will be pubic to everyone

    *) Different Use case
        1. To Encrypt Data
            -> Encrypt with public key
            -> Decrypt with private key
        2. To verify Identities
            -> Encrypt with private key
            -> Decrypt with public key

    *) 'Trap Door' function:
        -> it is a function that takes some sort of data that could be small or big peace of data and compress it into deterministic/fixed length small peace of data
        -> EX: sha256 Hash function
        -> But we can't go backwards mean's that we can't go back to original data

    *) Elliptic Curve Cryptography:
        -> The basis of public key cryptography
        -> is a 'Trap Door' function
        -> Mathematically links the private and public keys
        -> using the private key we can derive the public key
        -> but using public key we can't get the private key
*/

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

genKeyPair();
