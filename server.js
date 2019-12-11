// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");

// Environment Variables
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/merncrud";
const PORT = process.env.PORT || 3004;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>
  console.log("MongoDB connection established:", mongoURI)
);

// Error / Disconnection
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
app.use(express.json()); // returns middleware that only parses JSON

//Middleware for passport JS
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Controllers
const usersController = require("./controllers/users.js");

//test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
// const bookmarksController = require("./controllers/bookmarks.js");
// app.use("/bookmarks", bookmarksController);

// this will catch any route that doesn't exist
app.get("*", (req, res) => {
  res.status(404).json("Sorry, page not found");
});

app.listen(PORT, () => {
  console.log("Let's get things done on port", PORT);
});
