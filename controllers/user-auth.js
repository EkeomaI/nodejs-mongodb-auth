//jshint esversion:6

const User = require("../models/users").User;

exports.getIndex = (req, res) => {
    res.render("home");
};

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.getRegister = (req, res) => {
    res.render("register");
};

exports.postRegister = (req, res) => {
    // create a new user
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    });

    //res.redirect('/secrets');
};

exports.postLogin= (req, res) => {
    // authenticates a user
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},(err,foundUser) => {
        if (err){
            console.log(err);
        } else {
            if (foundUser){
                if (foundUser.password === password){
                    res.render('secrets');
                } else {
                    console.log(`Invalid password for ${username}`);
                    // specify a route when error
                }
            } else {
                console.log("The username does not exist!");
                // specify a route when error
            } 
        }
    });

    
};