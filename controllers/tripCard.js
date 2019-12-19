const express = require("express");
const mainTrip = express.Router();
const TripCards = require("../models/tripCard.js");
const Users = require("../models/users.js");

mainTrip.get("/:userId", (req, res) => {
  TripCards.find({ userId: req.params.userId }, (err, userTripCards) => {
    res.json(userTripCards);
  });

  // const user = await TripCards.find({})
  //   // .findOne({ _id: req.params.userId })
  //   .populate({ path: "user", match: req.params.userId })
  //   .exec((err, story) => {
  //     if (err) console.error(err);
  //     console.log(story);
  //     res.json(story);
  //   });
});

mainTrip.get("/", (req, res) => {
  TripCards.find({}, (err, foundTripCards) => {
    res.json(foundTripCards);
  });
});

mainTrip.delete("/:id", (req, res) => {
  TripCards.findByIdAndRemove(req.params.id, (err, deletedTripCards) => {
    res.json(deletedTripCards);
  });
});

mainTrip.post("/", (req, res) => {
  TripCards.create(req.body, (err, createdTripCards) => {
    res.json(createdTripCards);
  });
});

mainTrip.put("/:id", (req, res) => {
  TripCards.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedTripCards) => {
      // res.redirect("/dashboard");
      res.json(updatedTripCards);
    }
  );
});

module.exports = mainTrip;
