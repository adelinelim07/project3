const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  image: String, //to put avatar
  email: String
  //   trip: { type: Schema.Types.ObjectId, ref: "TripCards" }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
