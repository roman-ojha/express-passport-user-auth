// Issued JTW that need to get varify

// For that we need : 'base64url' package
import base64url from "base64url";

const jwt =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvbWFuIE9qaGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.LtEFcDm0kuLmhUHVu42i6uMmuvkR3KL11jVMzFM2nooRBTZjrBz9EmiqIVlSiiXfNrwlLo_7ruyA__prwVJfxFctOMc17UlR09kTvakD6tp3loQOIKwQm5XbbryQsMOA48dv9OkiQxijrp5uEpEXpikMFoHBnb2v06dtKAk9uTz2-s6Ver26rPiQ7TO6235QG43WQPac3ggGsEsNIR49n541zZXqHvJ0tGbDxr5sPZ-9wXdRTtGpL1WVnMB5IxfI-qpDaSFiNEgHZCTvixsgTp7y0dGbhbTkLOrJY91MwH3FmzQaK3iwDoOv_K1yR1TJgeYC_fauDNSf6DTb04hW7w";

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
