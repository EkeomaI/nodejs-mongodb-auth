//jshint esversion:6
const passport = require("passport");
const User = require("../models/users").User;
//const GooglePassport = require("../models/users").passport;

exports.getIndex = (req, res) => {
    res.render("home");
};

exports.getSecret = (req, res) => {
    User.find({"secret": {$ne:null}}, function(err,foundUsers){
        if (err){
            console.log(err);
        } else {
            if (foundUsers){
                res.render("secrets", {usersWithSecrets:foundUsers});
            }
        }
    });
    // if (req.isAuthenticated()){
    //     res.render("secrets");
    // } else {
    //     res.redirect("/login");
    // }
};

exports.getSubmit = (req, res) => {
    if (req.isAuthenticated()){
        res.render("submit");
    } else {
        res.redirect("/login");
    }
};

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.getGoogleUserProfile = passport.authenticate("google", { scope: ["profile"] });

exports.getFailureRedirect = passport.authenticate('google', { failureRedirect: "/login" });

exports.getSuccessRedirect = function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
};

exports.getLogout = (req, res) => {
    req.logOut();
    res.redirect("/");
};

exports.getRegister = (req, res) => {
    res.render("register");
};

exports.postSubmit = (req, res) => {
    const submittedSecret = req.body.secret;
    User.findById({_id:req.user._id}, (err, foundUser) => {
        if (err){
            console.log(err);
        } else {
            if (foundUser){
                foundUser.secret = submittedSecret;
                foundUser.save(() => {
                    res.redirect("/secrets");
                })
            }
        }
    })
};

exports.postRegister = (req, res) => {
    // must be username
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