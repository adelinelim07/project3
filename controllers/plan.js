const express = require("express");
const mainPlan = express.Router();
const Itineraries = require("../models/itinerary.js");

mainPlan.get("/:tripID", (req, res) => {
  Itineraries.findOne({ tripID: req.params.tripID.toString() }).then(
    foundPlan => {
      res.json(foundPlan);
    }
  );
});

mainPlan.delete("/delete/:id", (req, res) => {
  Itineraries.findByIdAndRemove(req.params.id, (err, deletedPlans) => {
    res.json(deletedPlans);
  });
});

mainPlan.post("/", (req, res) => {
  Itineraries.create(req.body, (err, createdPlans) => {
    res.json(createdPlans);
  });
});

mainPlan.put("/edit/:id", (req, res) => {
  Itineraries.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPlans) => {
      res.json(updatedPlans);
    }
  );
});

module.exports = mainPlan;
