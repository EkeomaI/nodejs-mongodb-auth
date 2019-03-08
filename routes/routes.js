//jshint esversion:6
const express = require("express");
const router = express.Router();

getIndexPage = require("../controllers/user-auth").getIndex;
getLoginPage = require("../controllers/user-auth").getLogin;
getLogoutPage = require("../controllers/user-auth").getLogout;
getRegisterPage = require("../controllers/user-auth").getRegister;
getSecretPage = require("../controllers/user-auth").getSecret;
getSubmitPage = require("../controllers/user-auth").getSubmit;
postLoginPage = require("../controllers/user-auth").postLogin;
postRegisterPage = require("../controllers/user-auth").postRegister;
postSubmitPage = require("../controllers/user-auth").postSubmit;


getGoogleUserProfilePage = require("../controllers/user-auth").getGoogleUserProfile;
failureRedirectPage = require("../controllers/user-auth").getFailureRedirect;
successRedirectPage = require("../controllers/user-auth").getSuccessRedirect;

router.get('/', getIndexPage);
router.get('/login', getLoginPage);
router.get('/logout', getLogoutPage);
router.get('/register', getRegisterPage);
router.get('/secrets', getSecretPage);
router.get('/submit', getSubmitPage);

router.post('/login', postLoginPage);
router.post('/register', postRegisterPage);
router.post('/submit', postSubmitPage);


router.get('/auth/google',getGoogleUserProfilePage);
router.get('/auth/google/secrets',failureRedirectPage,successRedirectPage);


module.exports = router;