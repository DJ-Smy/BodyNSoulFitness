require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use("/public", express.static("public"));
// app.use(methodOverride("_method"));
// const methodOverride = require("method-override");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

//var db;

// database connection
MongoClient.connect(process.env.DB_URL, function (err, client) {
  console.log(process.env.DB_URL);
  if (err) return console.log(err);
  db = client.db("BodyNSoulFitness");
  app.listen(parseInt(process.env.PORT), () => {
    console.log("MongoDB + NodeJs Server is running on port " + process.env.PORT);
  });
});

// middlewares
app.use(express.json());
app.use(cors());
