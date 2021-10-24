const express = require("express");
const router = express.Router();
const passport = require('passport');

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    const email = "test3@gmail.com";
    const password = "test3";

    User.register({ email: email, active: true }, password, function (err, user) {
      if (err) {
        res.status(401).json({
          status: "Authentication failed!"
        });
      }
      var authenticate = User.authenticate();
      authenticate(email, password, function (err, result) {
        if (err) {
          res.status(401).json({
            status: "Authentication failed!"
          });
        }
        res.status(200).json({
          user: user.email,
          status: "Authentication sucess!"
        });
      });
    });
  }
  catch (error) {
    res.status(400).json({
      message: "Some error occured",
      error
    });
  }
});

router.post("/signin", passport.authenticate('local', { successRedirect: '/user', failureRedirect: '/' })); 

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Authentication sucess!"
    });
  }
  catch (error) {
    res.status(400).json({
      message: "Some error occured",
      error
    });
  }
});

// app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
// 	console.log(req.user)
// 	res.redirect('/dashboard');
// });

module.exports = router;