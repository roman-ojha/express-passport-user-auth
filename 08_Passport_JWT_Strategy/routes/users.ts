import mongoose from "mongoose";
import express from "express";
const User = mongoose.model("User");
import passport from "passport";
const utils = require("../lib/utils");

const router = express.Router();

// route only access by authenticated user
// for that we will use passport jwt middleware that will automatically handled all the authentication process that we wrote on passport configuration
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }), // because we are using jwt for auth we will not going to use express session middleware
  (req, res, next) => {
    //   now we can check whether user is authenticated or not
    if (req.isAuthenticated()) {
      console.log(req.user);

      res.status(200).json({ success: true, msg: "You are authorized!" });
    }
  }
);

// route to login that will allow to issue the jwt that is signed with the private key and validate the jwt`
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: "could not find user" });
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        // after use valid we can issued new JWT for the user
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          user: user,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/register", function (req, res, next) {
  console.log(req.body);
  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });
  newUser
    .save()
    .then((user) => {
      // after user get create we will issue a new JWT
      const jwt = utils.issueJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
