const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

// connect to the database
connection.on("connected", () => {
  console.log("MongoDB is connected");
});

// with error
connection.on("error", (error) => {
  console.log("MongoDB error", error);
});

module.exports = mongoose;
