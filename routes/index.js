//Dashboard and home screen routes

//These express,router are used to signify that we are going to use the express router
const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User');
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//Profile
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);

router.post('/profile/photo', uploadCloud.single('img'), async (req, res) => {
  const {url} = req.file
  console.log(url)
  await User.findByIdAndUpdate(req.user.id, {
    img: url
  })
  res.redirect('/profile')
})

//Edit profile
router.get('/profile/edit', ensureAuthenticated, (req, res) => res.render('edit-profile', {
  user: req.user
}))
router.post('/profile/edit', async (req, res) => {
  const {
    name,
    email,
    description

  } = req.body
  const editProfile = await User.findByIdAndUpdate(req.user.id, {
    name,
    email,
    description

  })
  res.redirect('/profile')
})

module.exports = router;