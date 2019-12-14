const express = require("express");
const sessions = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/users.js");

sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err.message);
      res.send("cannot find user");
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.json(foundUser);
    } else {
      res.send("wrong password");
    }
  });
});

module.exports = sessions;
