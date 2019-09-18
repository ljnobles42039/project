const express = require('express')//1
const expressLayouts = require('express-ejs-layouts')  //need to set layouts//2
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const logger       = require('morgan');
const path         = require('path');
const favicon      = require('serve-favicon');



//Need to initialize ejs  //5
const app = express();

// Passport Config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI  //8 - created config file or can use an .env

//Connect ot Mongo
mongoose.connect(db, { useNewUrlParser: true })  //db is created  //9
.then(() => console.log(('MongoDB Connected....'))) //10
.catch(err => consoloe.log(err))  //11 now to users models

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

