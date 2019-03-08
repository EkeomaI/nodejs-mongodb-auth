//jshint esversion:6
//const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

    // using callbacks
    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
        // create a new user
        const newUser = new User({
            email: req.body.username, 
            password: hash
        });
        newUser.save(err => {
            if (err) {
                console.log(err);
            } else {
                res.render("secrets");
            }
        });
    });
    // using promises
    // bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    // // Store hash in your password DB.
    //     const newUser = new User({
    //         email: req.body.username, 
    //         password: hash
    //     });
    //     return newUser.save(err => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.render("secrets");
    //         }
    //     });
    // }).catch(function(error){
    //     console.log(error);
    // });
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
                bcrypt.compare(password,foundUser.password, function(err, result) {
                // res == true
                if (result){
                    res.render('secrets');
                } else {
                    console.log(`Invalid password for ${username}`);
                    // specify a route when error
                    res.render('login');
                }  
                });

                // // Load hash from your password DB (promises).
                // bcrypt.compare(password, hash).then(function(result) {
                // // res == true
                // if (result){
                //     return res.render('secrets');
                // } else {
                //     console.log(`Invalid password for ${username}`);
                //     // specify a route when error
                // }  
                // })
                // .catch(function(err){
                //     console.log(`Invalid password for ${username}`);
                //     // specify a route when error
                // });
                  
            } else {
                console.log("The username does not exist!");
                // specify a route when error
                res.render('login');
            } 
        }
    });

    
};