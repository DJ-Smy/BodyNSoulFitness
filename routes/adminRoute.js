const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Trainer = require("../models/trainerModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get-all-trainers", authMiddleware, async (req, res) => {
  try {
    const trainers = await Trainer.find({});
    res.status(200).send({
      message: "Trainers fetched successfully",
      success: true,
      data: trainers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching trainers",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching users",
      success: false,
      error,
    });
  }
});

router.post("/change-trainer-status", authMiddleware, async (req, res) => {
  try {
    const { trainerId, status, userId } = req.body;
    const trainer = await Trainer.findByIdAndUpdate(trainerId, {
      status,
    });

    const user = await User.findOne({_id: trainer.userId});
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-trainer-request-changed",
      message: `Your trainer account has changed the status ${status}`,
      onClickPath: "/notifications"
    })
    user.isTrainer = status === "approved" ? true : false; 
    await user.save();
    const trainers = await Trainer.find({});

    res.status(200).send({
      message: "Trainer status updated successfully",
      success: true,
      data: trainer,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error trainer status update",
      success: false,
      error,
    });
  }
});



module.exports = router;
