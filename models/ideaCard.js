const mongoose = require('mongoose');

const ideaCardSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    location: String, 
    image: String,
    comments: [String],  
    category: String
})

const IdeaCards = mongoose.model('idea', ideaCardSchema);

module.exports = IdeaCards;
