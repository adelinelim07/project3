const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  trip: { type: Schema.Types.ObjectId, ref: "TripCards" },
  ideaCard: { type: Schema.Types.ObjectId, ref: "IdeaCards" }
});

const Itineraries = mongoose.model("itinerary", itinerarySchema);

module.exports = Itineraries;

// {"_id":"5df3c4bec82e88055a170624",
// "comments":[""],
// "title":"IDEA",
// "description":"",
// "location":"",
// "image":"",
// "url":"",
// "contact":123456,
// "category":"Transport",
// "likeClicks":0,
// "__v":0}
