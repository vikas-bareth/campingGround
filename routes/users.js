const express = require('express');
const passport = require('passport');
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const users = require('../controllers/users');
const { register } = require('../models/user');


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login)

router.get('/logout', users.logout)


module.exports = router;