const express = require("express");
const mainTrip = express.Router();
const TripCards = require("../models/tripCard.js");

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
      res.json(updatedTripCards);
    }
  );
});

module.exports = mainTrip;
