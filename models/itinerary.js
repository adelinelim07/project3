const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  tripID: String,
  trip: [{ day: Number, ideas: [String] }],
  ideaPool: [],
  currentDay: Number
});

const Itineraries = mongoose.model("itinerary", itinerarySchema);

module.exports = Itineraries;

// LET TRIP =
// {"_id":"5df8807f23d0e20cccfc5dff",
// "title":"Titanic Voyage",
// "description":"",
// "country":"",
// "image":"",
// "startDate":null,
// "endDate":null,
// "__v":0}

// LET IDEA_CARD =
// {"_id":"5df8bbef4495283f30a4d9df",
// "comments":[""],
// "title":"Accom1",
// "description":"desc123",
// "location":"",
// "image":"",
// "url":"",
// "contact":null,
// "category":"Accommodation",
// "likeClicks":5,
// "trip":"5df8807f23d0e20cccfc5dff",
// "__v":0}
