const router1 = require('express').Router();
const appointmentdb = require('../models/eventSchema')
const moment = require('moment');


// Create event for appointment

router1.post("/api/calendar/create-event", async(req, res) => {
    const event = appointmentdb(req.body);
    //console.log(event);
    await event.save();
    res.sendStatus(201);
})

// update appointment

router1.post("/api/calendar/update", async(req, res) => {
    const update = appointmentdb(req.body);
    await update.save();
    res.sendStatus(201);
});

router1.get("/api/calendar/get-events", async(req, res) => {
    const events = await appointmentdb.find({
        start: {$gte: moment(req.query.start).toDate()},
        end: {$lte: moment(req.query.end).toDate()}
});
    console.log(events);
    res.send(events);
})

module.exports = router1;