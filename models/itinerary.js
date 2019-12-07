const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
    ideaCard: { type: Schema.Types.ObjectId, ref:"IdeaCards" },
})

const Itineraries = mongoose.model('itinerary', itinerarySchema);

module.exports = Itineraries;
