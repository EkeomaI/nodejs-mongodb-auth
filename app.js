//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// connect to the mongodb server
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const appRoutes = require("./routes/routes");
const appErrorRoutes = require("./routes/errors");

app.use(appRoutes);
app.use(appErrorRoutes);



app.listen(3000, () => {
    console.log(`Server started on 3000`);
});