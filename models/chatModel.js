const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    trainerId: {
      type: String,
      required: true,
    },
    trainerInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chats", chatSchema);
module.exports = chatModel;
