const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
})


const appointmentdb = mongoose.model("events", EventSchema);

module.exports = appointmentdb;




