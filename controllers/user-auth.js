//jshint esversion:6
const passport = require("passport");


const User = require("../models/users").User;

exports.getIndex = (req, res) => {
    res.render("home");
};

exports.getSecret = (req, res) => {
    if (req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
};

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.getLogout = (req, res) => {
    req.logOut();
    res.redirect("/");
};

exports.getRegister = (req, res) => {
    res.render("register");
};

exports.postRegister = (req, res) => {
    // must be uername
    User.register({username:req.body.username},req.body.password, function(err,user){
        if (err){
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            }); 
        }
    })
};

exports.postLogin= (req, res) => {
    // create a user model from the login form and authenticates the user
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });
    
    req.login(user,function(err){
        if (err){
            console.log(err);
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            }); 
        }
    }); 
};