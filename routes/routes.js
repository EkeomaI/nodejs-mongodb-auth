//jshint esversion:6
const express = require("express");
const router = express.Router();

getIndexPage = require("../controllers/user-auth").getIndex;
getLoginPage = require("../controllers/user-auth").getLogin;
getRegisterPage = require("../controllers/user-auth").getRegister;

postLoginPage = require("../controllers/user-auth").postLogin;
postRegisterPage = require("../controllers/user-auth").postRegister;

router.get('/', getIndexPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);

router.post('/login', postLoginPage);
router.post('/register', postRegisterPage);





module.exports = router;