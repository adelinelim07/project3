const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripCardSchema = new mongoose.Schema({
  title: String,
  description: String,
  country: String,
  // image: String,
  startDate: Date,
  endDate: Date,
  userId: { type: Schema.Types.ObjectID, ref: "user" }
});

const TripCards = mongoose.model("trip", tripCardSchema);

module.exports = TripCards;
