import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
import connection from "./database";
import { validPassword } from "../lib/passwordUtils";
const User = connection.models.User;

// Firstly we need to do is to define verified callback for the passport local strategy

// creating the custom field to define on passport to look into
const customField = {
  // <passport_verify_callback_params_name>: "<user_requested_body_params>"
  username: "username",
  password: "password",
};

// Documenting:
const verifyCallBack = (username: string, password: string, doneCb) => {
  // 'doneCb' is the callback function that we will pass authentication result
  // 'username' & 'password' are the parameter that we get from user request body
  // by default 'username' & 'password' are the field that passport js local strategy gives un as parameter
  // but we can define custom field 'customField' that we want passport to look into
  //
  // Now bello is our implementation of authenticating the user
  // first we will find the 'username' on database
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        // if we didn't find the user then we will return 'doneCb(null,false)'
        return doneCb(null, false);
        // doneCb(<is_error>,<status|did_find_user>);
        // now passport will return 401 http status
      }
      // if User exist:
      //  we will try to validate the password that user send us
      // validPassword(<user_password>,<user_hash_from_the_database>,<user_salt_from_the_database>)
      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        // if the login credential are valid then we will authorized the user
        // now we will return the user into doneCb
        return doneCb(null, user);
      } else {
        return doneCb(null, false);
      }
    })
    .catch((err) => {
      // if error happen we will pass error on 'doneCb'
      doneCb(err);
    });
};
// creating LocalStrategy with just 'username' & 'password'
// const strategy = new LocalStrategy(verifyCallBack);

// creating LocalStrategy with custom field
const strategy = new LocalStrategy(customField, verifyCallBack);

// now we can use new strategy that we created on passport js
passport.use(strategy);

// Implementation
// passport.use(
//   new LocalStrategy(function verify(username, password, cb) {
//     // Custom Implementation for authorizing user and return 'cb'
//     User.findOne({ username: username })
//       .then((user) => {})
//       .catch(() => {});
//   })
// );
