const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ideaCardSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    location: String, 
    image: String,
    url: String,
    comments: [String], 
    contact: Number,
    category: { type: String, enum: ['Accomodation','Places Of Interest','Transport']},
    trip: { type: Schema.Types.ObjectId, ref:"TripCards" }
})

const IdeaCards = mongoose.model('idea', ideaCardSchema);

module.exports = IdeaCards;
