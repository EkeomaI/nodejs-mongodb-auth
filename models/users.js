//jshint esversion:6
require("dotenv").config();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

// create a schema
const Schema = mongoose.Schema;

// instantiate a new userSchema
const userSchema = new Schema({
    email: String,
    password: String
});

// encrypt the password field in the mongoose user collection
const secret = process.env.SECRET;
userSchema.plugin(encrypt, {
    secret:secret,
    encryptedFields:["password"]
});

// create a document model
exports.User = mongoose.model("User", userSchema, "User");
