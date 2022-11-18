import crypto from "crypto";
const hash = crypto.createHash("sha256");
import fs from "fs";
import { encryptWithPrivateKey, encryptWithPublicKey } from "./encrypt";
import { decryptWithPrivateKey, decryptWithPublicKey } from "./decrypt";

// This is the data that we are going to signed
// NOTE: signing data doesn't not protect the data itself
const myData = {
  firstName: "Roman",
  lastName: "Ojha",
  socialSecurityNumber: "This is a social Security Number",
};

// Compressing or hashing the data

// String version of the our data that can be hashed
const myDataString = JSON.stringify(myData);

// Hashing the data
hash.update(myDataString);

// converting Hah data into hexadecimal formate
const hashData = hash.digest("hex");
// console.log(hashData);

const senderPrivateKey = fs.readFileSync(
  __dirname + "/id_rsa_priv.pem",
  "utf8"
);

// Signed/encrypt hash version of the data with private key:
const signedMessage = encryptWithPrivateKey(senderPrivateKey, hashData);
// So here I am the sender of this data and I own the private key that I am going to signed the message with

// Now if you will just send the signedMessage to receiver then they will not going to be able to do anything with it
// Not only we have to verify that nobody has interfere with the data we also need to verify the sender
// to do that we need to provide the receiver with the few more peace of information
// Information:
// 1. Which Hash function we used to hash the data
// 2. we have to give them the original data so that they can take the hash function and hash that data and take the signature that we provide them with it and match it up with the hash data to authenticate the data and the sender

// creating the package of the data to send to receiver
const packageOfDataSend = {
  algorithm: "sha256",
  originalData: myData,
  signedAndEncryptedData: signedMessage,
};

export default packageOfDataSend;
