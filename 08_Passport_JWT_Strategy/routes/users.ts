import mongoose from "mongoose";
import express from "express";
const User = mongoose.model("User");
import passport from "passport";
const utils = require("../lib/utils");

const router = express.Router();

// route only access by authenticated user
router.get("/protected", (req, res, next) => {});

// route to login that will allow to issue the jwt and validate the jwt
router.post("/login", function (req, res, next) {});

router.post("/register", function (req, res, next) {});

module.exports = router;
