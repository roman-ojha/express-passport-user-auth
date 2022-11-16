import crypto from "crypto";

// Here we will validate and create password:

function genHash(password: string, salt: string) {
  // generate password hash:
  // https://www.rfc-editor.org/rfc/rfc8018#section-5.2
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  // 10000 iteration
  // 64 length string
  // 'sha512' hash function
}

function genPassword(password: string) {
  // 'password' is a plain text password that we get from the user on registration

  // creating salt secret key
  const salt = crypto.randomBytes(32).toString("hex");
  return {
    salt,
    hash: genHash(password, salt),
  };
}

function validatePassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  // hash : is the previously stored hashed password while user register or while user change password

  // to validate password we will again generate a hash from same password and salt
  var hashVerify = genHash(password, salt);

  // we will check does the both hash value match and return bool
  return hash === hashVerify;
}

export { validatePassword, genPassword };
