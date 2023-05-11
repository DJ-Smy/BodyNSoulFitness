const express = require("express");
const app = express();
require("dotenv").config();

const dbConfig = require("./config/dbConfig");

app.use(express.json());

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const trainerRoute = require("./routes/trainerRoute");
const path = require("path");

app.use(express.static(path.join("public")));

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/trainer", trainerRoute);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 5002;

app.get("/", (req, res) => res.send("Hello World!!"));
app.listen(port, () => console.log(`Listening on port ${port}!`));

// hope heroku deploy works.....
