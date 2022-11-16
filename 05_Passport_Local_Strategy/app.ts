const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
var passport = require("passport");
var cy = require("crypto");
var routes = require("./routes");
const connection = require("./config/database");
const MongoStore = require("connect-mongo");
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
    secret: process.env.SECRET,
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
