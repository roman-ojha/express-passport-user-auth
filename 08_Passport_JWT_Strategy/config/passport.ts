import fs from "fs";
import path from "path";
import passport from "passport";
import passportJWT, { ExtractJwt, StrategyOptions } from "passport-jwt";
const User = require("mongoose").model("User");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");
const JwtStrategy = passportJWT.Strategy;

// https://www.passportjs.org/packages/passport-jwt/

// passport JWT Options
// we have to pass this options to passport-jwt middleware
const passportJWTOptions: StrategyOptions = {
  // ExtractJwt will mention how we will extract JWT from http header
  // EX: in most of the case we will extract JWT from authorization header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // NOTE: if you want to extract JWT from cookie then we have to create our own function and implement that
  // see the documentation for that
  secretOrKey: PUB_KEY || "secret phrase",
  issuer: "enter issuer here",
  audience: "enter audience here",
  algorithms: ["RS256"],
  ignoreExpiration: false,
  passReqToCallback: false,
  jsonWebTokenOptions: {
    complete: false,
    clockTolerance: 0,
    maxAge: "2d",
    clockTimestamp: 100,
    nonce: "string here for OpenID",
  },
};

// this is the actual option that we will use for this authentication example
const options: StrategyOptions = {
  // header {'Authorization': 'Bearer <token>'}
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // passing the public key because we are using 'RS256' algo to issue and verify the JWT
  // we are passing the public key because here we are trying to verify the user
  secretOrKey: PUB_KEY,
  // passing the algorithm that it will accept
  algorithms: ["RS256"],
};

// passport 'passport-jwt' strategy is using 'jsonwebtoken' library to verify JWT
// https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
// if we will go to the give link we will get the 'verify' function from 'jwt'
// where this function will get implement by 'passport-jwt' strategy
// jwt.verify(token, secretOrPublicKey, [options, callback])
// creating the verify callback function for jwt strategy
const verifyCallback = (payload, done: Function) => {
  // 'payload' in this case because we are doing the user authenticate we will use mongodb database '_id' field
  // so mongodb _id is inside the 'payload.sub'

  // Using mongodb database to find the user
  console.log(payload);
  User.findOne({ _id: payload.sub })
    .then((user) => {
      console.log(user);

      if (user) {
        // now because user is already verified and also we found the user in the database we will now return that user into done callback so that it can attached it into 'request' object
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(null, false));
};

// creating the passport-jwt strategy
// now this strategy will automatically validate the user and the pass the payload inside 'verifyCallback'
const strategy = new JwtStrategy(options, verifyCallback);

// implementing Passport JWT strategy
type typePassport = typeof passport;
module.exports = (passport: typePassport) => {
  // this function will get called when we will call 'passport.authenticated()' function

  // now here we will ues the above implemented passport jwt strategy
  passport.use(strategy);
};
