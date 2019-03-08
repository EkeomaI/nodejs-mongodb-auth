//jshint esversion:6
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// create a schema
const Schema = mongoose.Schema;

// instantiate a new userSchema
const userSchema = new Schema({
    email: String,
    password: String
});

// use to hash and salt passwords and save users to vhe mongodb database
userSchema.plugin(passportLocalMongoose);

// create a document model
const User = new mongoose.model("User", userSchema, "User");

passport.use(User.createStrategy());

// serialise: create the authentication cookie
passport.serializeUser(User.serializeUser());

// deserialise: unpack the cookie to extract user Info
passport.deserializeUser(User.deserializeUser());


exports.User = User;
