const express = require("express");
const app = express();
require("dotenv").config();


const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 8000;


app.use(express.json());

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const trainerRoute = require('./routes/trainerRoute');

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/trainer", trainerRoute);

app.listen(port, () => console.log(`Listening on port ${port}!`));
