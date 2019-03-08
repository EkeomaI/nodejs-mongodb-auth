//jshint esversion:6
const express = require("express");
const router = express.Router();
const get404Page = require('../controllers/errors').get404;

router.use('/', get404Page); // for all pages not found

module.exports = router;