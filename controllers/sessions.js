const express = require("express");
const sessions = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/users.js");

sessions.post("/", (req, res) => {
  console.log("IN SESSION");
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log("Database error", err.message);

      res.send("Error loading mongodb");
    }
    console.log("found: ", foundUser);
    if (foundUser == null) {
      console.log("herere");
      res.send({ message: null });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.json(foundUser);
      } else {
        res.send({ message: false });
      }
    }
  });
});

module.exports = sessions;
