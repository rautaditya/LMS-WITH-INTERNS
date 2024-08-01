// completion.js
const mongoose = require("mongoose");

const completionSchema = new mongoose.Schema({
  // userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true
  // },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  certificateGenerated: {
    type: Boolean,
    default: false,
  },

  // completedVideos: {
  //     type: Number,
  //     required: true
  // }
});

const Completion = mongoose.model("Completion", completionSchema);

module.exports = Completion;
