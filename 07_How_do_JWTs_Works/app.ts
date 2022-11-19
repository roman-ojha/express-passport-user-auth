/*
    => WE will use 'RS256' algorithm to encrypt and decrypt the data
    => also we will use 'SHA256' Hashing function to Header and Payload Data in JTW
    => https://jwt.io/
    -> https://www.rfc-editor.org/rfc/rfc7519
    *) JWT:
        -> as we discuss before JTW combine of three thing:
            1. header (algorithm & type)
                -> sender send the receiver which algorithm that we use to encode the data
                => Encoded: 
                    eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
                => Decoded:
                    {
                    "alg": "RS256",
                    "typ": "JWT"
                    }
            2. payload (data)
                -> payload is a Metadata about some entity
                -> in this case info about the User
                -> not a credential information on payload
                -> Encoded:
                    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvbWFuIE9qaGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ
                -> Decoded:
                    {
                    "sub": "1234567890",
                    "name": "Roman Ojha",
                    "admin": true,
                    "iat": 1516239022
                    }
                -> 'iat' (issued at claim)
                -> https://www.rfc-editor.org/rfc/rfc7519#section-4.1
            3. Signature
*/

// Issued JWT Example:
// import "./issuedJTWExample";

// Issued JWT and Verify JWT on our own Example:
// import "./issuedJWT";

// Issued JWT and Verify JWT using 'jsonwebtoken' Example
import "./jsonwebtoken";
