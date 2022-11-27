import fs from "fs";
import path from "path";
import passport from "passport";
const User = require("mongoose").model("User");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// TODO
const options = {};

// TODO
type typePassport = typeof passport;
module.exports = (passport: typePassport) => {};
