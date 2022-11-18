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

import genKeyPair from "./cryptography";
import { encryptWithPublicKey } from "./encrypt";
import { decryptWithPrivateKey } from "./decrypt";
import fs from "fs";

// Generating public and private Key
genKeyPair();

// 1. Encrypting and Decrypting Data:
// Encrypting Data with public key:
// reading public key from the .pem file
const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

// Getting encrypted Buffer message object
const encryptedMessage = encryptWithPublicKey(publicKey, "My name is Roman");
console.log(encryptedMessage.toString());

// Decrypting Data with private Key
const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");
// Getting Original Message from Encrypted Buffer message
const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);
console.log(decryptedMessage.toString());

// 2. Encrypting and Decrypting Digital Signature
// here we will use data and signature on that data so that the other person can authenticate the signature and verify the data
import "./verifyIdentity";
// Here the example that we did on 'verifyIdentity' is the same exact process is used to Json Web Token(JWT)
// we can see the same example here as well : https://jwt.io/
