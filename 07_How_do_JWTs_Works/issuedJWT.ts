// Now here we will create our own JTW token
import base64url from "base64url";
import crypto from "crypto";
import fs from "fs";

/* *
 * ISSUANCE Part:
 */

// The RSA-SHA256 algorithm that we are using for this example
const signatureFunction = crypto.createSign("RSA-SHA256");

const headerObj = {
  alg: "RS256",
  typ: "JWT",
};

const payloadObj = {
  sub: "1234567890",
  name: "Roman Ojha",
  admin: true,
  iat: 1516239022,
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

// converting these into base64url format
const base64UrlHeader = base64url(headerObjString);
// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
const base64UrlPayload = base64url(payloadObjString);
// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvbWFuIE9qaGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ

// Now because we have done this now we have to create the hash from these 2 data and signed that hash and put that into the signature

// Creating Verify Signature:
// loading the 'base64UrlHeader' & 'base64UrlPayload' on JWT format
signatureFunction.write(base64UrlHeader + "." + base64UrlPayload);
signatureFunction.end();

// loading the private key that we will sign in with
const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");
// Signing the JTWs with private key
const signatureBase64 = signatureFunction.sign(privateKey, "base64");

// To derived the JWT we have to convert 'Base64' to 'Base64Url'
const signatureBase64Url = base64url.fromBase64(signatureBase64);

/* *
 *  End of ISSUANCE Part
 */

/* *
 *  VERIFYING JWT PART
 */

// Verify function
const verifyFunction = crypto.createVerify("RSA-SHA256");

// JWT:
const jwt = base64UrlHeader + "." + base64UrlPayload + "." + signatureBase64Url;
// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvbWFuIE9qaGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.LtEFcDm0kuLmhUHVu42i6uMmuvkR3KL11jVMzFM2nooRBTZjrBz9EmiqIVlSiiXfNrwlLo_7ruyA__prwVJfxFctOMc17UlR09kTvakD6tp3loQOIKwQm5XbbryQsMOA48dv9OkiQxijrp5uEpEXpikMFoHBnb2v06dtKAk9uTz2-s6Ver26rPiQ7TO6235QG43WQPac3ggGsEsNIR49n541zZXqHvJ0tGbDxr5sPZ-9wXdRTtGpL1WVnMB5IxfI-qpDaSFiNEgHZCTvixsgTp7y0dGbhbTkLOrJY91MwH3FmzQaK3iwDoOv_K1yR1TJgeYC_fauDNSf6DTb04hW7w

// Need to split JWT into part between '.' keyword
const jtwParts = jwt.split(".");
const headerInBase64UrlFormat = jtwParts[0];
const payloadInBase64UrlFormat = jtwParts[1];
const signatureInBase64UrlFormat = jtwParts[2];

// Now we can decode these
// decoded object
const decodedHeader = base64url.decode(headerInBase64UrlFormat);
// {"alg":"RS256","typ":"JWT"}
const decodedPayload = base64url.decode(payloadInBase64UrlFormat);
// {"sub":"1234567890","name":"Roman Ojha","admin":true,"iat":1516239022}

// Decoded Encrypted Signature
const decodeSignature = base64url.decode(signatureInBase64UrlFormat);

// We will use header and payload to load to verify
verifyFunction.write(headerInBase64UrlFormat + "." + payloadInBase64UrlFormat);
verifyFunction.end();

// Converting Base65Url into Base64
const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);

// Decrypting the Signature using the Public Key that correspond to the Issuer Private Key

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

const signatureIsValid = verifyFunction.verify(
  publicKey,
  jwtSignatureBase64,
  "base64"
);

console.log(signatureIsValid);

/* *
 *  END VERIFYING JWT PART
 */
