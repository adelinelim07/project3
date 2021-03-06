// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const nodemailer = require('nodemailer');
const db = mongoose.connection;

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
app.use(express.static("public"));

app.use(
  session({
    secret: "mutusamy chen",
    resave: false,
    saveUninitialized: false
  })
);

// app.use(
//   nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//     user: 'travel.lah.sg@gmail.com',
//     pass: 'travelLAH'
//   }
// })
// );



// Routes
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const mainTripController = require("./controllers/tripCard.js");
app.use("/maindashboard", mainTripController);

const planController = require("./controllers/plan.js");
app.use("/itinerary", planController);
//test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
const ideaCardController = require("./controllers/ideaCard.js");
app.use("/ideaCard", ideaCardController);

// this will catch any route that doesn't exist
app.get("*", (req, res) => {
  res.status(404).json("Sorry, page not found"); // to be replaced with a nicer looking 404 page.
});

app.listen(PORT, () => {
  console.log("Let's get things done on port ", PORT);
});
