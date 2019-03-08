//jshint esversion:6
const express = require("express");
const router = express.Router();

getIndexPage = require("../controllers/user-auth").getIndex;
getLoginPage = require("../controllers/user-auth").getLogin;
getLogoutPage = require("../controllers/user-auth").getLogout;
getRegisterPage = require("../controllers/user-auth").getRegister;
getSecretPage = require("../controllers/user-auth").getSecret;

postLoginPage = require("../controllers/user-auth").postLogin;
postRegisterPage = require("../controllers/user-auth").postRegister;

router.get('/', getIndexPage);
router.get('/login', getLoginPage);
router.get('/logout', getLogoutPage);
router.get('/register', getRegisterPage);
router.get('/secrets', getSecretPage);

router.post('/login', postLoginPage);
router.post('/register', postRegisterPage);





module.exports = router;