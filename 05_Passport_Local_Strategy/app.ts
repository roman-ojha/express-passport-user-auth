import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import crypto from "crypto";
import routes from "./routes/index";
import connection from "./config/database";
import MongoStore from "connect-mongo";
// const MongoStore = require("connect-mongo")(session);

// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/passport-user-auth-tut",
  collectionName: "sessions",
});

// creating session middleware
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
// https://www.passportjs.org/packages/passport-local/
// https://www.passportjs.org/howtos/password/

// including the implementation of passport js authentication
import "./config/passport";

// to initialized the passport middleware every time we load the route
app.use(passport.initialize());
// we are also using the passport session
// where we just implemented the 'passport.serializerUser' & 'passport.deserializerUser' function on './config/passport.ts'
// also it is connected to the express-session middleware
app.use(passport.session());
// passport.session will also check is the requesting user is logged in or is the requesting user exist on the session or not

// Understanding passport middleware's
app.use((req, res, next) => {
  // express session will create this session object
  console.log(req.session);
  // passport will insert the new property 'passport' inside the session
  // passport: { user: '637496a49cdd251ddff8548c' }
  // this happen because of the 'passport.serialize'
  // where we pass the 'user.id'

  // and the passport middleware will create user object
  console.log(req.user);
  // for 'req.user' object we deserialize the user where we wrote the function 'passport.deserialize()' where we grab the data from the database based on the userId that we get from the 'session.passport.user'

  next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(8080, () => {
  console.log("Server Started");
});
