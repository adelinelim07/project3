const express = require("express");
const User = require("../models/users.js");
const users = express.Router();
const bcrypt = require("bcrypt");

users.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  console.log("controller", req.body);
  User.create(req.body, (err, createdUser) => {
    res.json(createdUser); //.json() will send proper headers in response so client knows it's json coming back
  });
});

module.exports = users;

// const passport = require("passport"),
//   LocalStrategy = require("passport-local").Strategy;

//fill in code here

// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     });
//   })
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/maindashboard",
//     failureRedirect: "/login",
//     failureFlash: "Invalid username or password.",
//     successFlash: "Welcome!"
//   })
// );
