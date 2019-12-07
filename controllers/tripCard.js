const express = require('express');
const router = express.Router();
const TripCards = require('../models/tripCards.js');

router.get('/', (req, res) =>{
    TripCards.find({}, (err, foundTripCards) => {
        res.json(foundTripCards);
    })
});

router.delete('/:id', (req, res) => {
    TripCards.findByIdAndRemove(req.params.id, (err, deletedTripCards) => {
        res.json(deletedTripCards);
    })
})

router.post('/', (req, res) => {
    TripCards.create(req.body, (err, createdTripCards) => {
        res.json(createdTripCards);
    });
})

router.put('/:id', (req, res) => {
    TripCards.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTripCards) => {
        res.json(updatedTripCards)
    })
})

module.exports = router;
