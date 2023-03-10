const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Trainer = require("../models/trainerModel");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Reply = require("../models/replyModel");

router.post("/get-trainer-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Trainer info fetched successfully",
      data: trainer,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting trainer info",
      success: false,
      error: error,
    });
  }
});

router.post("/get-trainer-info-by-id", authMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ _id: req.body.trainerId });
    res.status(200).send({
      success: true,
      message: "Trainer info fetched successfully",
      data: trainer,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting trainer info",
      success: false,
      error: error,
    });
  }
});

router.post("/update-trainer-profile", authMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.findOneAndUpdate({ userId: req.body.userId }, req.body);
    res.status(200).send({
      success: true,
      message: "Trainer profile updated successfully",
      data: trainer,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating trainer info",
      success: false,
      error: error,
    });
  }
});

router.get("/get-appointments-by-trainer-id", authMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.body.userId });
    const appointments = await Appointment.find({ trainerId: trainer._id });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});

router.get("/get-chats-by-trainer-id", authMiddleware, async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.body.userId });
    const chats = await Chat.find({ trainerId: trainer._id });
    res.status(200).send({
      message: "Chat fetched successfully",
      success: true,
      data: chats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching Chat",
      success: false,
      error,
    });
  }
});

router.post("/change-chat-status", authMiddleware, async (req, res) => {
  try {
    const { chatId, status } = req.body;
    const chat = await Chat.findByIdAndUpdate(chatId, {
      status,
    });

    const user = await User.findOne({ _id: chat.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "chat-status-changed",
      message: `Your chat status has been ${status}`,
      onClickPath: "/chatLists",
    });

    await user.save();

    res.status(200).send({
      message: "chat status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing chat status",
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
    console.log(error);
    res.status(500).send({
      message: "Error User status update",
      success: false,
      error,
    });
  }
});

router.post("/make-reply", authMiddleware, async (req, res) => {
  try {
    req.body.status = "Reply";
    req.body.userId = req.body.userInfo._id;
    const newReply = new Reply(req.body);
    await newReply.save();
    //pushing notification to trainer based on his userid
    const user = await User.findOne({ _id: req.body.userId });
    user.unseenNotifications.push({
      type: "new-chat-request",
      message: `A new Reply request has been made by ${req.body.userInfo.name}`,
      onClickPath: `/chatLists`,
    });

    await user.save();
    res.status(200).send({
      message: "Reply made successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Reply making",
      success: false,
      error,
    });
  }
});

module.exports = router;
