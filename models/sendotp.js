const mongoose = require("mongoose");

// Check if a connection already exists before creating a new one
// mongodb://localhost:27017/otp

// if (!mongoose.connection.readyState) {
//   mongoose.connect("mongodb+srv://adityaraut6029:qXI7tIfi5zIuF7I9@vivaaks.1zrohzs.mongodb.net/otp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// }
// mongoose.connect("mongodb://localhost:27017/newdatabaseforproject",{
//   useNewUrlParser:true,
//   useUnifiedTopology:true,
// })

const otpSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  otp: String,
  loginTime: Date,
  logoutTime: Date,
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const OTP = mongoose.model("OTP", otpSchema);
const VerifiedUserData = mongoose.model("VerifiedUserData", otpSchema);

module.exports = {
  OTP,
  VerifiedUserData,
};
