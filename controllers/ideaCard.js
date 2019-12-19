const express = require("express");
const router = express.Router();
const IdeaCards = require("../models/ideaCard.js");
const TripCards = require("../models/tripCard.js");

router.get("/", (req, res) => {
  IdeaCards.find({}, (err, foundIdeaCards) => {
    res.json(foundIdeaCards);
  });
});

// router.get('/',(req,res) => {
//     IdeaCards.find()
//     .populate("trip")
//     .exec((error,allTrips)=>{
//         if(error) console.error(err.message);

//         if(allTrips){
//             TripCards.find({},(err,allTrips)=>{
//                 res.json()
//             })
//         }
//     })
// })

router.delete("/:id", (req, res) => {
  IdeaCards.findByIdAndRemove(req.params.id, (err, deletedIdeaCards) => {
    res.json(deletedIdeaCards);
  });
});

router.post("/", (req, res) => {
  IdeaCards.create(req.body, (err, createdIdeaCards) => {
    res.json(createdIdeaCards);
  });
});

router.put("/:id", (req, res) => {
  IdeaCards.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedIdeaCards) => {
      res.json(updatedIdeaCards);
    }
  );
});

router.get("/:id", (req, res) => {
  IdeaCards.findById(req.params.id, (err, foundIdeaCard) => {
    res.json(foundIdeaCard);
  });
});

router.get("/filter/:id", (req, res) => {
  IdeaCards.find({ trip: req.params.id }, (err, foundIdeaCards) => {
    res.json(foundIdeaCards);
  });
});

module.exports = router;
