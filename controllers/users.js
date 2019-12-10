const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

//fill in code here

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/maindashboard",
    failureRedirect: "/login",
    failureFlash: true
  })
);

module.exports = router;
