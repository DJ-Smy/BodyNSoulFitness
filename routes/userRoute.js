const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Trainer = require("../models/trainerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const Appointment = require("../models/appointmentModel");
const Chat = require("../models/chatModel");
const Reply = require("../models/replyModel");
const moment = require("moment");
const nodemailer = require("nodemailer");
require("dotenv").config();

//email config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bodynsoulfitness2023@gmail.com",
    pass: process.env.AUTH_PASS,
  },
});

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(200).send({ message: "User already exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error creating user: ${error.message}`,
      success: false,
      error: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.status === "blocked") {
      return res.status(200).send({
        message: "User account already blocked please contact the trainer",
        success: false,
      });
    }
    if (!user) {
      return res.status(200).send({ message: "User does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error logging in", success: false, error: error });
  }
});

//send email link for reset password
router.post("/sendPasswordLink", async (req, res) => {
  //console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).send({ status: 401, message: "Enter Your Email" });
  }

  try {
    const user = await User.findOne({ email: email });
    //console.log("user", user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "120s",
    });

    const setUserToken = await User.findByIdAndUpdate({
      _id: user._id,
      verifyToken: token,
    });

    //console.log("token", token);
    //console.log("setUserToken", setUserToken);
    if (setUserToken) {
      const mailOptions = {
        from: "bodynsoulfitness2023@gmail.com",
        to: email,
        subject: "Sending Email for password reset",
        text: `This Link valid for 2 minutes http://localhost:3000/forgot-password/${user.id}/${setUserToken.verifyToken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(401).send({ status: 401, message: "Email not send" });
        } else {
          return res.status(200).send({
            status: 200,
            message: "Email sent successfully",
          });
        }
      });
    }
  } catch (error) {
    res.status(401).send({ status: 401, message: "Invalid User" });
  }
});

// forgot password
// verify user for forgot password time

router.get("/forgot-password/:userId/:token", async (req, res) => {
  const { userId, token } = req.params;
  try {
    const validUser = await User.findOne({ _id: userId }, { verifyToken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(validUser);
    //console.log(verifyToken);

    if (validUser && verifyToken.id) {
      res.status(201).json({ status: 201, validUser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    return res.status(401).send({ status: 500, message: error.message });
  }
});

//change password
router.post("/:userId/:token", async (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;

  try {
    const validUser = await User.findOne({ _id: userId }, { verifyToken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (validUser && verifyToken.id) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      const setNewUserPassword = await User.findByIdAndUpdate({ _id: userId }, { password: newPassword });

      setNewUserPassword.save();

      res.status(201).json({ status: 201, setNewUserPassword });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: error.message });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    //console.log(user);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({ message: "User does not existed", success: false });
    } else {
      res.status(200).send({ success: true, data: user });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting user info",
      success: false,
      error: error,
    });
  }
});

router.post("/update-user-profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.body.userId }, req.body);
    console.log(req.body);
    console.log(user);
    res.status(200).send({
      success: true,
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating User info",
      success: false,
      error: error,
    });
  }
});

router.post("/apply-trainer-account", authMiddleware, async (req, res) => {
  try {
    const newTrainer = new Trainer({ ...req.body, status: "pending" });
    await newTrainer.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-trainer-request",
      message: `${newTrainer.firstName} ${newTrainer.lastName} has applied for a trainer account`,
      onClickPath: "/admin/trainerslist",
      data: {
        trainerId: newTrainer.id,
        name: newTrainer.firstName + " " + newTrainer.lastName,
      },
    });
    await User.findByIdAndUpdate(adminUser.id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Trainer applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error applying trainer account: ${error.message}`,
      success: false,
      error: error,
    });
  }
});

router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying notifications",
      success: false,
      error,
    });
  }
});

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying notifications",
      success: false,
      error,
    });
  }
});

router.get("/get-all-approved-trainers", authMiddleware, async (req, res) => {
  try {
    const trainers = await Trainer.find({ status: "approved" });
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

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "YYYY-MM-DD").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to trainer based on his userid
    const user = await User.findOne({ _id: req.body.trainerInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/trainer/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.post("/check-booking-availability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, "YYYY-MM-DD").toISOString();

    const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const trainerId = req.body.trainerId;
    const appointments = await Appointment.find({
      trainerId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.post("/make-chat", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";
    const newChat = new Chat(req.body);
    await newChat.save();
    //pushing notification to trainer based on his userid
    const user = await User.findOne({ _id: req.body.trainerInfo.userId });
    user.unseenNotifications.push({
      type: "new-chat-request",
      message: `A new chat request has been made by ${req.body.userInfo.name}`,
      onClickPath: `/trainer/chatLists/${req.body.trainerInfo.userId}`,
    });

    await user.save();
    res.status(200).send({
      message: "Chat made successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error chat making",
      success: false,
      error,
    });
  }
});

router.get("/get-appointment-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    console.log("appointment: " + appointments);
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

router.get("/get-chat-by-user-id", authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.body.userId });
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

router.get("/get-reply-by-user-id", authMiddleware, async (req, res) => {
  try {
    const reply = await Reply.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Chat fetched successfully",
      success: true,
      data: reply,
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

module.exports = router;
