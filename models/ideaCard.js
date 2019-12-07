const mongoose = require('mongoose');

const ideaCardSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    location: String, 
    image: String,
    comments: [String], 
    contact: Number,
    category: { type: String, enum: ['Accomodation','PlacesOfInterest','Transport']},
    trip: { type: Schema.Types.ObjectId, ref:"TripCards" }
})

const IdeaCards = mongoose.model('idea', ideaCardSchema);

module.exports = IdeaCards;
