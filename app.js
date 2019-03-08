//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// should be placed before connecting to the mongodb server
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session()); // use passport to manage the sessions

// connect to the mongodb server
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex",true);


const appRoutes = require("./routes/routes");
const appErrorRoutes = require("./routes/errors");

app.use(appRoutes);
app.use(appErrorRoutes);



app.listen(3000, () => {
    console.log(`Server started on 3000`);
});