// So, if you want you can use all of these code to Issue the JWT and to Verify the JWT Token that we did on 'issuedJWT.ts' file
// But there is an easier way to do this and that is using 'jsonwebtoken' npm library

import jwt from "jsonwebtoken";
import fs from "fs";

// Getting public key and the private key
const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");
const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

// Using Payload that we use in 'issuedJWT.ts'
const payloadObj = {
  sub: "1234567890",
  name: "Roman Ojha",
  admin: true,
  iat: 1516239022,
};
// we don't have to specify the header 'jsonwebtoken' will automatically handle these things

// Issuing the JWT by passing 'payload', 'privateKey' and the algorithm
const signedJWT = jwt.sign(payloadObj, privateKey, { algorithm: "RS256" });
// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvbWFuIE9qaGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.LtEFcDm0kuLmhUHVu42i6uMmuvkR3KL11jVMzFM2nooRBTZjrBz9EmiqIVlSiiXfNrwlLo_7ruyA__prwVJfxFctOMc17UlR09kTvakD6tp3loQOIKwQm5XbbryQsMOA48dv9OkiQxijrp5uEpEXpikMFoHBnb2v06dtKAk9uTz2-s6Ver26rPiQ7TO6235QG43WQPac3ggGsEsNIR49n541zZXqHvJ0tGbDxr5sPZ-9wXdRTtGpL1WVnMB5IxfI-qpDaSFiNEgHZCTvixsgTp7y0dGbhbTkLOrJY91MwH3FmzQaK3iwDoOv_K1yR1TJgeYC_fauDNSf6DTb04hW7w

// Verifying the Signed JWT
jwt.verify(signedJWT, publicKey, { algorithms: ["RS256"] }, (err, payload) => {
  if (!err) {
    // console.log(payload);
    // payload:
    // { sub: '1234567890', name: 'Roman Ojha', admin: true, iat: 1516239022 }
  }
});
