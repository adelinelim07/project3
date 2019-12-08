const express = require('express');
const router = express.Router();
const IdeaCards = require('../models/ideaCard.js');

router.get('/', (req, res) =>{
    IdeaCards.find({}, (err, foundIdeaCards) => {
        res.json(foundIdeaCards);
    })
});

router.delete('/:id', (req, res) => {
    IdeaCards.findByIdAndRemove(req.params.id, (err, deletedIdeaCards) => {
        res.json(deletedIdeaCards);
    })
})

router.post('/', (req, res) => {
    IdeaCards.create(req.body, (err, createdIdeaCards) => {
        res.json(createdIdeaCards);
    });
})

router.put('/:id', (req, res) => {
    IdeaCards.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedIdeaCards) => {
        res.json(updatedIdeaCards)
    })
})

module.exports = router;
