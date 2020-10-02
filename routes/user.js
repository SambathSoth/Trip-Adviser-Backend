const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// LOAD USER MODEL
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// LOGIN PAGE
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// REGISTER PAGE
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// REGISTER
router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, password2 } = req.body;
    let errors = [];

    if (!first_name || !last_name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            first_name,
            last_name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    first_name,
                    last_name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    username: `${first_name} ${last_name}`,
                    first_name,
                    last_name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;