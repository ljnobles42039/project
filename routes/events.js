const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User")
const uploader = require("../helpers/multer");
const { ensureAuthenticated } = require('../config/auth');


//All events
router.get('/', ensureAuthenticated, async (req, res) => {
  let query = Event.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.sport != null && req.query.sport != '') {
    query = query.regex('sport', new RegExp(req.query.sport, 'i'))
  }
  try {
    const event = await Event.find({})
    res.render('event/index', {
      event: event,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
});



//Add new events
router.get('/new', ensureAuthenticated, async (req, res) => {
  try {
    const users = await User.find({})
    const event = new Event()
    res.render('event/new', {
      users: users,
      event: event
    })
  } catch {
    res.redirect('event')
  }
});

//Create Author Route
router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    user: req.body.user,
    sport: req.body.sport,
    date: new Date(req.body.date),
    time: req.body.time,
    description: req.body.description
  })

  try {
    const newEvent = await event.save()
    //res.redirect(`event/${newEvent.id}`)
    res.redirect(`event/index`)
  } catch {
    err => console.log(err)
    res.redirect('event')

  }
});

module.exports = router;