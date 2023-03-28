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
    const users = await User.find({ isTrainer: false, isAdmin: false });
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
    const { trainerId, status, userId, tUserId } = req.body;
    console.log(trainerId, status, userId, tUserId);
    const trainer = await Trainer.findByIdAndUpdate(trainerId, {
      status,
    });
    const tUser = await User.findByIdAndUpdate(tUserId, {
      status,
    });

    const user = await User.findOne({ _id: trainer.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-trainer-request-changed",
      message: `Your trainer account has changed the status ${status}`,
      onClickPath: "/notifications",
    });
    user.isTrainer = status === "approved" ? true : false;
    await user.save();
    const trainers = await Trainer.find({});

    res.status(200).send({
      message: "Trainer status updated successfully",
      success: true,
      data: trainer,
      tUser,
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

router.post("/delete-trainer", authMiddleware, async (req, res) => {
  try {
    const { trainerId, userId, tUserId } = req.body;
    console.log(trainerId, userId, tUserId);

    const admin = await User.findById(userId);

    if (!admin) {
      return res
        .status(200)
        .send({ message: "Need admin permission", success: false });
    }

    const deleteTrainerId = await Trainer.findByIdAndDelete(trainerId);
    const deleteUserId = await User.findByIdAndDelete(tUserId);

    res.status(200).send({
      message: "Trainer delete successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error trainer delete",
      success: false,
      error,
    });
  }
});

router.post("/change-user-status", authMiddleware, async (req, res) => {
  try {
    const { trainerId, status, userId } = req.body;

    const user = await User.findByIdAndUpdate(trainerId, {
      status,
    });
    await user.save();
    res.status(200).send({
      message: "User status updated successfully",
      success: true,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      message: "Error User status update",
      success: false,
      error,
    });
  }
});

router.post("/delete-user", authMiddleware, async (req, res) => {
  try {
    const { trainerId, userId } = req.body;

    const admin = await User.findById(userId);

    //console.log(admin);
    if (!admin.isAdmin) {
      return res
        .status(200)
        .send({ message: "Need admin permission", success: false });
    }

    const user = await User.findByIdAndDelete(trainerId);
    res.status(200).send({
      message: "User delete successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error User Delete",
      success: false,
      error,
    });
  }
});

module.exports = router;
