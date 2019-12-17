const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  image: String, //to put avatar
  email: String
  // tripId: { type: mongoose.ObjectId, ref: "trip" }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
