const express = require("express");
const app = express();
const cors = require("cors");
const logger =  require("morgan");
const passport = require('passport'); // authorization
const session = require('express-session');  // session middleware

const User = require('./models/user');

const notesRouter = require("./routes/notes");
const archiveRouter = require("./routes/archive");
const labelsRouter = require("./routes/labels");
const searchRouter = require("./routes/search");
const userRouter = require("./routes/user");

const port = process.env.PORT || 3001;

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/noteDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', () => {
  console.log("Connected to mongoDB!");
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));

// Configure session
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up routers
app.use("/notes", notesRouter);
app.use("/labels", labelsRouter);
app.use("/archive", archiveRouter);
app.use("/search", searchRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log("Dev-Note back end is running on " + port);
});

module.exports = app;
