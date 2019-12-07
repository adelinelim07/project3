const mongoose = require('mongoose');

const tripCardSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    country: String,
    image: String,
})

const TripCards = mongoose.model('trip', tripCardSchema);

module.exports = TripCards;
