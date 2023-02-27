const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Trainer = require("../models/trainerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/authMiddleware');
const Appointment = require("../models/appointmentModel");
const Chat = require("../models/chatModel");
const moment = require("moment");


router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
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
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error: error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async(req, res) => {
  
  try {
    const user = await User.findOne({ _id: req.body.userId });
    //console.log(user);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({ message: "User does not existed", success: false });
    } else {
      res.status(200).send({ success: true, 
        data: user
      })
    }
  } catch (error) {
    res.status(500)
    .send({ message: "Error getting user info", success: false, error: error });
  }
})


router.post("/update-user-profile", authMiddleware, async(req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.body.userId },
      req.body);
      console.log(req.body);
      console.log(user);
    res.status(200).send({
      success: true,
      message: 'User profile updated successfully',
      data: user,
    })
  } catch (error) {
    res.status(500)
    .send({ message: "Error updating User info", success: false, error: error });
  }
})

router.post("/apply-trainer-account", authMiddleware, async (req, res) => {
  try {
    const newTrainer = new Trainer({...req.body, status: "pending" });
    await newTrainer.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-trainer-request",
      message: `${newTrainer.firstName} ${newTrainer.lastName} has applied for a trainer account`,
      onClickPath: '/admin/trainerslist',
      data: {
        trainerId: newTrainer.id,
        name: newTrainer.firstName + " " + newTrainer.lastName
      },
    })
    await User.findByIdAndUpdate(adminUser.id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Trainer applied successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error applying trainer account: ${error.message}`,
      success: false,
      error: error,
    });
  }
});

router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
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
  }
);

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
    const trainers = await Trainer.find({status: "approved"});
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
    
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
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
      onClickPath: "/trainer/chatLists",
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
    const appointments = await Appointment.find({ userId : req.body.userId });
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
    const appointments = await Chat.find({ userId : req.body.userId });
    res.status(200).send({
      message: "Chat fetched successfully",
      success: true,
      data: appointments,
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
