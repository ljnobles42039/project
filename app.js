require('dotenv').config()

const express = require('express') //1
const expressLayouts = require('express-ejs-layouts') //need to set layouts//2
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require("serve-favicon");
const logger = require("morgan");
const path = require("path");


//Need to initialize ejs  //5
const app = express();

// Passport Config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI //8 - created config file or can use an .env
mongoose
  .connect(process.env.DB || "mongodb://localhost/findMyRun", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
// //Connect ot Mongo
// mongoose.connect(db, {
//     useNewUrlParser: true
//   }) //db is created  //9
//   .then(() => console.log(('MongoDB Connected....'))) //10
//   .catch(err => consoloe.log(err)) //11 now to users models

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Express body parser
app.use(express.urlencoded({
  extended: true
}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Express View engine setup

app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
  })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
const index = require("./routes/index");
const users = require("./routes/users");
const event = require("./routes/events")
app.use("/", index);
app.use("/users", users);
app.use("/event", event)



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));