
//Dashboard and home screen routes

//These express,router are used to signify that we are going to use the express router
const express = require('express');  
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//profile
router.get('/profile', forwardAuthenticated, (req, res) => res.render('profile'));

module.exports = router;


