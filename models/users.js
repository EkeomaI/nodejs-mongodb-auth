//jshint esversion:6
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate"); 

// create a schema
const Schema = mongoose.Schema;

// instantiate a new userSchema
const userSchema = new Schema({
    email: String,
    password: String,
    googleId:String,
    secret:String
});

// used to hash and salt passwords and save users to the mongodb database
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)

// create a document model
const User = mongoose.model("User", userSchema, "User");

passport.use(User.createStrategy());

// serialise: create the authentication cookie
passport.serializeUser(function(user, done) {
  done(null, user);
});

// deserialise: unpack the cookie to extract user Info
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// google authentication strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
    });
  }
));


exports.User = User;
