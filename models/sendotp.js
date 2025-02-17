const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  otp: String,
  loginTime: Date,
  logoutTime: Date,
  enrolledCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      enrollmentTime: { type: Date, default: Date.now }, // Store enrollment time
   
    },
  ],
});

const VerifiedUserData = mongoose.model("VerifiedUserData", otpSchema);
module.exports = { VerifiedUserData };
