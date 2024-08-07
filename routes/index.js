var express = require("express");
var router = express.Router();
const multer = require("multer"); // Import multer module
const Course = require("../models/course");
const path = require("path");
const { OTP, VerifiedUserData } = require("../models/sendotp");
const nodemailer = require("nodemailer");
const Config = require("../config");
const QuizResult = require("../models/testRecord");
const Question = require("../models/question");
const { getTotalTimeFromDatabase } = require("../util");
const mongoose = require("mongoose");
const Video = require("../models/video");
const Completion = require("../models/completions");
const FormSubmission = require("../models/fotterform")
const Contact=require("../models/contactForm");

const User = require('../models/user');

const GoogleStrategy=require('passport-google-oauth20').Strategy;
const PDFDocument = require("pdfkit");
const sizeOf = require("image-size");
const pdf = require("html-pdf");
const fs = require("fs");
//.env
const dotenv = require("dotenv");
dotenv.config();
require("../db.js");


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Define the filename for the uploaded file
  },
});

const upload = multer({ storage: storage }); // Create an instance of Multer using the configured storage


router.post("/add-question/:id", async (req, res) => {
  const { set, question, options, correctOption, time } = req.body;
  const courseId = req.params.id;
  const newQuestion = new Question({
    set,
    question,
    options: options.split(","),
    correctOption: parseInt(correctOption),
  });

  try {
    await newQuestion.save();
    const savedQuestion = await newQuestion.save();
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { questions: savedQuestion._id } },
      { new: true }
    ).exec();
    res.redirect("/set-exam/" + courseId);
  } catch (err) {
    console.error(err);
    res.redirect(302, "/adminpage", {
      error: "Error adding question. Please try again.",
    });
  }
});

router.post("/set-total-time", async (req, res) => {
  console.log(req.body); // Log the entire request body to inspect the data
  const { newTotalTimeInSeconds } = req.body;
  await Config.findOneAndUpdate(
    {},
    { totalTimeInSeconds: newTotalTimeInSeconds },
    { upsert: true }
  );

  // Log the change
  console.log(`Total time updated to ${newTotalTimeInSeconds} seconds`);

  res.send("Total time updated successfully");
});


router.get("/questionsSet/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate("questions").exec();

    if (!course) {
      // Handle the case where the course is not found
      return res.status(404).send("Course not found");
    }
    res.render("questionSet", { course });
  } catch (err) {
    // Handle any errors that may occur during the database query or rendering
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/deleteExam/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate("questions").exec();

    if (!course) {
      // Handle the case where the course is not found
      return res.status(404).send("Course not found");
    }

    // Assuming you want to delete the associated questions as well
    const questions = course.questions;

    // Delete the questions
    course.questions = [];

    // Save the course to update the database
    await course.save();

    // Send a success response
    res.status(200).send("Exam deleted successfully");
  } catch (err) {
    // Log the error with more details
    console.error("Error during exam deletion:", err);

    // Send an error response with details
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

router.post("/delete/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    await Course.findByIdAndDelete(courseId);
    res.redirect("/adminpage"); // Redirect back to the admin page after deletion
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// New route for payment page after enrollment
router.get("/enroll/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userEmail = req.session.userEmail;
    const user = await VerifiedUserData.findOne({ email: userEmail });

    if (!user) {
      // return res.status(404).send("User not found");
        return res.send("User not found");
    }

    // Check if the user is already enrolled in the course
    const isEnrolled = user.enrolledCourses.includes(courseId);

    // Fetch course details
    const course = await Course.findById(courseId);

    res.render("enroll", { course, isEnrolled });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/paymentdone/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userEmail = req.session.userEmail;
    const user = await VerifiedUserData.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user is already enrolled in the course
    const isEnrolled = user.enrolledCourses.includes(courseId);

    if (!isEnrolled) {
      // Update the user's enrolled courses
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    const course = await Course.findById(courseId);
    res.render("paymentdone", {
      course,
      enrolledCourses: user.enrolledCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/courseoverview/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userEmail = req.session.userEmail;
    const user = await VerifiedUserData.findOne({ email: userEmail });

    // Perform a database query to fetch course details based on courseId
    const course = await Course.findById(courseId);

    // Render the course overview page with the course details and user
    res.render("courseoverviewpage", { course, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/setoverview/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      overviewTitle,
      overviewDescription,
      rating,
      duration,
      videos,
      liveLectures,
      curriculumTitle,
    } = req.body;

    // Update the course details in the database
    await Course.findByIdAndUpdate(courseId, {
      overviewTitle,
      overviewDescription,
      rating,
      duration,
      videos,
      liveLectures,
      curriculumTitle,
      // Add additional fields as needed
    });

    res.redirect("/courseoverview/" + courseId);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//send mail code login
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adityaraut4289@gmail.com",
    pass: "yuvr rzcr ndil ypne",
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/send-otp", async (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();

  try {
    const existingUser = await OTP.findOne({ email });

    if (!existingUser) {
      await OTP.create({ email, otp });
    } else {
      existingUser.otp = otp;
      await existingUser.save();
    }

    const additionalText = "Thank you for using our OTP service. Your OTP is:";
    const mailOptions = {
      from: "adityaraut4289@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `${additionalText} ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ error: "Failed to send OTP" });
      }
      res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ error: "Failed to generate OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const email = req.body.email;
  const userOTP = req.body.otp;
  const name = req.body.name;
  const phone = req.body.phone;
  const userEmail = req.body.email;
  req.session.userEmail = userEmail;
  req.session.name = name;

  try {
    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      return res
        .status(401)
        .json({ success: false, error: "OTP not generated for this email" });
    }

    if (otpData.otp === userOTP) {
      await OTP.deleteOne({ email });

      const existingVerifiedUser = await VerifiedUserData.findOne({ email });
      if (!existingVerifiedUser) {
        const verifiedUserData = {
          name,
          phone,
          email,
          loginTime: new Date(), // Use the current date and time
        };
        await VerifiedUserData.create(verifiedUserData);
      } else {
        await VerifiedUserData.updateOne(
          { email },
          { $set: { loginTime: new Date() } }
        );
      }
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    } else {
      res.status(401).json({ success: false, error: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});


const ExamAttempt = require("../models/examAttempt"); // Adjust the path as per your project structure
const passport = require("passport");

router.get("/questionPaper/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.session.userId;

    // Check if the student has already attempted the exam for this course
    const examAttempt = await ExamAttempt.findOne({
      course: courseId,
      student: studentId,
    });

    if (examAttempt) {
      return res.render("exam", {
        alreadyAttempted: true,
        course: null,
        totalTimeInSeconds: null
      });
    }

    const course = await Course.findById(courseId).populate("questions").exec();

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const config = await Config.findOne();
    const totalTimeInSeconds = config ? config.totalTimeInSeconds : 300;

    res.render("exam", { 
      alreadyAttempted: false,
      course,
      totalTimeInSeconds 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/submit-quiz", async (req, res) => {
  try {
    const { courseName, userScore, totalQuestions } = req.body;
    const email = req.session.userEmail;
    const name = req.session.name;

    if (!email || !name) {
      return res.status(401).json({ error: "User session not found" });
    }

    const currentDate = new Date();
    const dayOfWeek = getDayOfWeek(currentDate);

    const quizResult = new QuizResult({
      courseName,
      email,
      name,
      score: userScore,
      totalQuestions,
      date: currentDate.toISOString().split("T")[0],
      dayOfWeek,
    });

    await quizResult.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adityaraut4289@gmail.com",
        pass: "your_gmail_app_password", // Use environment variable for security
      },
    });

    const mailOptions = {
      from: "adityaraut4289@gmail.com",
      to: email,
      subject: "Quiz Results",
      text: `Name: ${name} 
        scored ${userScore} out of ${totalQuestions} in the quiz.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Quiz submitted and email sent successfully" });
    });
  } catch (error) {
    console.error("Error saving quiz results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/submit-quiz", async (req, res) => {
//   try {
//     const { courseName, userScore, totalQuestions } = req.body;
//     const email = req.session.userEmail;
//     const name = req.session.name;
//     const studentId = req.session.userId; // Make sure this is set during login

//     if (!email || !name || !studentId) {
//       return res.status(401).json({ error: "User session not found" });
//     }

//     // Record the exam attempt
//     const course = await Course.findOne({ courseName: courseName });
//     if (course) {
//       await ExamAttempt.create({
//         student: studentId,
//         course: course._id
//       });
//     } else {
//       console.error("Course not found:", courseName);
//     }

//     const currentDate = new Date();
//     const dayOfWeek = getDayOfWeek(currentDate);

//     const quizResult = new QuizResult({
//       courseName,
//       email,
//       name,
//       score: userScore,
//       totalQuestions,
//       date: currentDate.toISOString().split("T")[0],
//       dayOfWeek,
//     });

//     await quizResult.save();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "adityaraut4289@gmail.com",
//         pass: "your_gmail_app_password", // Use environment variable for security
//       },
//     });

//     const mailOptions = {
//       from: "adityaraut4289@gmail.com",
//       to: email,
//       subject: "Quiz Results",
//       text: `Name: ${name} 
//         scored ${userScore} out of ${totalQuestions} in the quiz.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ error: "Failed to send email" });
//       }
//       console.log("Email sent: " + info.response);
//       res.status(200).json({ message: "Quiz submitted and email sent successfully" });
//     });
//   } catch (error) {
//     console.error("Error saving quiz results:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

function getDayOfWeek(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}
function getDayOfWeek(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

router.get("/logout", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await VerifiedUserData.findOne({ email: userEmail });

    if (user) {
      // Update logoutTime with the current date
      user.logoutTime = new Date();

      // Save the changes to the database
      await user.save();
    }

    // Destroy the session before rendering the view
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Error logging out");
      } else {
        // Render the view after destroying the session
        res.redirect("/");
      }
    });
  } catch (err) {
    console.error("Error updating logout time:", err);
    res.status(500).send("Error logging out");
  }
});
//superadminsection
const adminSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  image: String,
  mobile: String, // Added 'mobile' field to the schema
});
const Admin = mongoose.model("Admin", adminSchema);
router.get("/adminlogin", (req, res) => {
  res.render("login");
});



function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    // If admin is logged in, proceed to the next middleware/route handler
    next();
  } else {
    // If admin is not logged in, redirect to the login page
    res.redirect("/adminlogin"); // Assuming '/adminlogin' is your login route
  }
}

router.get("/adminpage", isAuthenticated, async (req, res) => {
  try {
    const courses = await Course.find();
    const questionCount = await Question.countDocuments();
    const totalTimeInSeconds = await getTotalTimeFromDatabase();
    const usersdata = await VerifiedUserData.find();
    const StudentResult = await QuizResult.find();
    const courseCount = courses.length;
    const enrolledStudentCount = await VerifiedUserData.aggregate([
      { $unwind: "$enrolledCourses" },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    const totalEnrolledStudents = enrolledStudentCount.length > 0 ? enrolledStudentCount[0].count : 0;

    res.render("adminpage", {
      courses,
      questionCount,
      totalTimeInSeconds,
      usersdata,
      StudentResult,
      courseCount,
      totalEnrolledStudents
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      res.status(401).json({ success: false, message: "Invalid email or password. Please try again." });
    } else {
      req.session.admin = admin;
      res.json({ success: true, message: "Login successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
const transporterforsuperadmin = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adityaraut4289@gmail.com",
    pass: "yuvr rzcr ndil ypne", // Use your email password here
  },
});

router.post("/addadmin", async (req, res) => {
  const { email, name, password, address, image, mobile } = req.body;

  try {
    const newAdmin = new Admin({
      email,
      name,
      password,
      address,
      image,
      mobile,
    });
    await newAdmin.save();

    const mailOptions = {
      from: "adityaraut4289@gmail.com",
      to: email,
      subject: "Admin Account Created",
      text: `Your admin account has been successfully created.\n\nUsername: ${email}\nPassword: ${password}`,
    };

    const info = await transporterforsuperadmin.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.send("Admin added successfully. Email sent.");
  } catch (error) {
    console.error(error);
    res.send("Error adding admin.");
  }
});

router.get("/superadmin", async (req, res) => {
  try {
    const admins = await Admin.find({}, "email name mobile");
    res.render("superadmin", { admins }); // Use 'admins' instead of 'addadmins'
  } catch (error) {
    console.error(error);
    res.send("Error fetching admin data.");
  }
});
router.post("/deleteadmin/:id", async (req, res) => {
  const adminId = req.params.id;
  try {
    await Admin.findByIdAndDelete(adminId);
    res.redirect("/superadmin");
  } catch (error) {
    console.error(error);
    res.setDefaultEncoding(
      "error to deleting the admin please try again later"
    );
  }
});
router.get("/logoutadmin", (req, res) => {
  req.session.admin = null; // Clear the admin session
  res.redirect("/adminlogin"); // Redirect to the login page
});
router.post("/submit-video", upload.single("video"), async (req, res) => {
  try {
    const { courseId, title } = req.body;
    const videoFilename = req.file.filename;

    // Create a new Video instance
    const newVideo = new Video({
      title,
      course: courseId, // Associate the video with the selected course
      filename: videoFilename,
    });

    // Save the video to the database
    await newVideo.save();

    res.send("Video submitted successfully!");
    // alert("Video submitted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Modify the Student Profile Route to fetch and display videos for each enrolled course
router.get("/classroompage", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await VerifiedUserData.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Fetch the enrolled courses of the student
    const enrolledCourses = user.enrolledCourses;

    // Fetch videos for each enrolled course
    const videosByCourse = {};
    for (const courseId of enrolledCourses) {
      const videos = await Video.find({ course: courseId });
      videosByCourse[courseId] = videos;
    }

    res.render("classroompage", { user, videosByCourse });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// Modify the route handler for fetching videos for a specific course
router.get("/classroomlectures/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Fetch videos for the specified course
    const videos = await Video.find({ course: courseId }).populate("course");
    const course = await Course.findById(courseId);
    // Pass the fetched videos to the EJS template
    res.render("classroomlectures", { videos, course });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/admin/videos/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const videos = await Video.find({ course: courseId });
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/videos/delete", async (req, res) => {
  try {
    const videosToDelete = req.body.videoToDelete;
    // Perform validation and error checking on the video IDs

    // Delete the videos from the database
    const deletionResult = await Video.deleteMany({
      _id: { $in: videosToDelete },
    });

    res.json({ message: "Videos deleted successfully", deletionResult });
  } catch (error) {
    console.error("Error deleting videos:", error);
    res.status(500).json({ error: "Failed to delete videos" });
  }
});



// Route to handle saving video completion data
router.post("/saveVideoCompletion", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const userName = req.session.name;
    // Extract data from the request body
    const { courseName } = req.body;

    // Create a new Completion document using Mongoose
    const completion = new Completion({
      userName,
      userEmail,
      courseName: courseName,
    });

    // Save the Completion document to the database
    await completion.save();

    res.status(200).json({ message: "Video completion saved successfully." });
  } catch (error) {
    console.error("Error saving video completion:", error);
    res.status(500).json({ error: "Error saving video completion." });
  }
});
// Route to render the certificate generation page for admin
// Route to render the certificate generation page for admin
// Fetch list of students with course details
// Existing route to fetch all students
router.get("/students", async (req, res) => {
  try {
    const students = await Completion.find({});
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// New route to fetch and render individual student details
router.get("/student/:id", async (req, res) => {
  try {
    const student = await Completion.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    const examResults = await QuizResult.find({ email: student.userEmail });

    // res.json({ student, examResults });
    res.render('studentDetail', { student,examResults });

    
  
  
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/generate-certificate/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    // Retrieve user information based on the ID
    const user = await Completion.findById(userId);

    // Access the user information
    const userName = user.userName;
    const courseName = user.courseName;
    const userEmail = user.userEmail;

    // Read the certificate image
    const imagePath = path.join(__dirname, "../public/images/certificatePage.jpg");
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    // Set the dimensions of the certificate image
    const certificateWidth = 1600;
    const certificateHeight = 1131;

    // Create a new PDF document with dimensions matching the certificate image
    const doc = new PDFDocument({
      size: [certificateWidth, certificateHeight],
      margin: 0,
    });

    // Pipe the PDF output to a buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const buffer = Buffer.concat(buffers);
        resolve(buffer);
      });
      
      // Draw the certificate image onto the PDF
      doc.image(imagePath, 0, 0, { width: certificateWidth, height: certificateHeight });

      // Draw the course name and username onto the PDF
      doc.fontSize(44).fillColor("#000").text(courseName, certificateWidth / 17, certificateHeight / 4, { align: 'center' });
      doc.fontSize(35).fillColor("#000").text(userName, certificateWidth / 17, certificateHeight / 2.3 , { align: 'center' });

      // End the PDF document
      doc.end();
    });

    // Send email with PDF attachment
  

    const mailOptions = {
      from: "adityaraut4289@gmail.com",
      to: userEmail,
      subject: "Certificate Generated",
      text: "Congratulations! Your certificate has been generated.",
      attachments: [
        {
          filename: "certificate.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Update the certificateGenerated field
    user.certificateGenerated = true;
    await user.save();

    console.log(`Certificate generated successfully for user with ID: ${userId}, Email: ${userEmail}`);
    res.json({ message: "Certificate generated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating certificate" });
  }
});


router.post('/submitForm', async (req, res) => {
  try {
      const { firstName, lastName, email, phone, message } = req.body;
      const newContact = new Contact({ firstName, lastName, email, phone, message });
      await newContact.save();
      res.status(201).send('Message saved successfully.');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
  }
});
router.post('/footerform', async (req, res) => {
  try {
    const { firstName, email, message } = req.body;
    const newSubmission = new FormSubmission({ firstName, email, message });
    await newSubmission.save();
    res.status(201).send('Message saved successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving message.');
  }
});

// Initialize Passport middleware
router.use(passport.initialize());
router.use(passport.session());

router.get("/", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const name = req.session.name;
    console.log("User Email:", userEmail);

    const verifiedUser = await VerifiedUserData.findOne({ email: userEmail });
    const courses = await Course.find();
    req.session.loggedIn = false;
    const loggedIn = req.session.loggedIn;
    console.log("Verified User:", verifiedUser);

    res.render("firstPage", { courses, loggedIn });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

router.get("/home", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;

    if (!userEmail) {
      return res.status(400).send("User email not found in session");
    }

    const user = await VerifiedUserData.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const courses = await Course.find();
    const questions = await Question.find();
    const config = await Config.findOne();
    const enrolledCourseIds = user.enrolledCourses;
    const enrolledCourses = await Course.find({ _id: { $in: enrolledCourseIds } });
    const totalTimeInSeconds = config ? config.totalTimeInSeconds : 300;

    req.session.loggedIn = true;
    const loggedIn = req.session.loggedIn;
    res.render("student", {
      user,
      courses,
      questions,
      totalTimeInSeconds,
      loggedIn,
      enrolledCourses,
      certificate: user.certificate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

passport.use(new GoogleStrategy({
  clientID: "688183137830-7rbkh5ej776fg7jt90v6n6dhcg4t65re.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3003/auth/google/callback"

}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ email: profile.emails[0].value });
    if (user) {
      done(null, user);
    } else {
      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value
      });
      await newUser.save();
      done(null, newUser);
    }
  } catch (error) {
    console.error(error);
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  const { name, email } = req.user;

  req.session.userEmail = email;
  req.session.name = name;

  req.session.save((err) => {
    if (err) {
      console.error("Error saving session:", err);
      return res.redirect("/"); 
    }
    res.redirect("/home");
  });
});

router.get("/redirect-to-google", (req, res) => {
  res.redirect("/auth/google");
});
// Get a specific student by ID
router.get("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Completion.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/studentDataPage/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Completion.findById(studentId);

    if (!student) {
      return res.status(404).send('Student not found');
    }
    const examResults = await QuizResult.find({ email: student.userEmail });


    // Render a page with the student data
    res.render('studetnDataPage', { student, examResults });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// router.post("/submit", upload.single("courseImage"), async (req, res) => {
//   try {
//     const { courseName, courseProfessorName, courseDescription } = req.body;
//     const courseImage = req.file.filename;

//     // Create a new course instance
//     const newCourse = new Course({
//       courseName,
//       courseImage,
//       courseProfessorName,
//       courseDescription,
//     });

//     // Save the course to the database
//     await newCourse.save();

//     res.send("Course submitted successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // const mongoose = require('mongoose');
// router.post("/courses/submit", upload.single("courseImage"), async (req, res) => {
//   try {
//     const {
//       courseName,
//       courseProfessorName,
//       courseDescription,
//       overviewTitle,
//       overviewDescription,
//       rating,
//       duration,
//       videos,
//       liveLectures,
//       curriculumTitle,
//       price,
//       questions, // Assuming this is an array of question IDs
//       studentsEnrolled,
//       instructors,
//       lastUpdated,
//       languages,
//       requirements,
//       learningObjectives,
//       courseIncludes,
//       ratingCount,
//       courseDuration,
//       articles,
//       codingExercises,
//       downloadableResources
//     } = req.body;

//     const courseImage = req.file ? req.file.filename : null; // Handling optional image

//     // Create a new course instance
//     const newCourse = new Course({
//       courseName,
//       courseImage,
//       courseProfessorName,
//       courseDescription,
//       overviewTitle,
//       overviewDescription,
//       rating,
//       duration,
//       videos,
//       liveLectures,
//       curriculumTitle,
//       price,
//       questions,
//       studentsEnrolled,
//       instructors,
//       lastUpdated: new Date(lastUpdated), // Ensure it's a Date object
//       languages,
//       requirements,
//       learningObjectives,
//       courseIncludes,
//       ratingCount,
//       courseDuration,
//       articles,
//       codingExercises,
//       downloadableResources
//     });

//     // Save the course to the database
//     await newCourse.save();

//     res.send("Course submitted successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// // New route for handling course overview submission
// router.get("/editcourse/:courseId", async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const course = await Course.findById(courseId);

//     res.render("editcourse", { course });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });


// router.post("/editcourse/:courseId", upload.single("courseImage"), async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const {
//       courseName,
//       courseProfessorName,
//       courseDescription,
//       overviewTitle,
//       overviewDescription,
//       rating,
//       duration,
//       videos,
//       liveLectures,
//       curriculumTitle,
//       price,
//       questions,
//       studentsEnrolled,
//       instructors,
//       lastUpdated,
//       languages,
//       requirements,
//       learningObjectives,
//       courseIncludes,
//       ratingCount,
//       courseDuration,
//       articles,
//       codingExercises,
//       downloadableResources
//     } = req.body;

//     const courseImage = req.file ? req.file.filename : null; // Handling optional image

//     // Update the course details in the database
//     const updatedCourse = {
//       courseName,
//       courseProfessorName,
//       courseDescription,
//       overviewTitle,
//       overviewDescription,
//       rating,
//       duration,
//       videos,
//       liveLectures,
//       curriculumTitle,
//       price,
//       questions,
//       studentsEnrolled,
//       instructors,
//       lastUpdated: new Date(lastUpdated), // Ensure it's a Date object
//       languages,
//       requirements,
//       learningObjectives,
//       courseIncludes,
//       ratingCount,
//       courseDuration,
//       articles,
//       codingExercises,
//       downloadableResources
//     };

//     if (courseImage) {
//       updatedCourse.courseImage = courseImage;
//     }

//     await Course.findByIdAndUpdate(courseId, updatedCourse);

//     res.redirect("/adminpage"); // Redirect back to the admin page after editing
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
router.post('/courses/submit', upload.single('courseImage'), async (req, res) => {
  try {
    const {
      courseName,
      courseProfessorName,
      courseDescription,
      overviewTitle,
      overviewDescription,
      rating,
      duration,
      videos,
      liveLectures,
      curriculumTitle,
      price,
      questions, // Assuming this is an array of question IDs
      studentsEnrolled,
      instructors,
      lastUpdated,
      languages,
      requirements,
      learningObjectives,
      courseIncludes,
      ratingCount,
      courseDuration,
      articles,
      codingExercises,
      downloadableResources
    } = req.body;

    const courseImage = req.file ? req.file.filename : null;

    // Basic validation
    if (!courseName || !courseDescription || !price) {
      return res.status(400).send('Course name, description, and price are required.');
    }

    // Create a new course instance
    const newCourse = new Course({
      courseName,
      courseImage,
      courseProfessorName,
      courseDescription,
      overviewTitle,
      overviewDescription,
      rating,
      duration,
      videos,
      liveLectures,
      curriculumTitle,
      price,
      questions,
      studentsEnrolled,
      instructors,
      lastUpdated: lastUpdated ? new Date(lastUpdated) : new Date(),
      languages,
      requirements,
      learningObjectives,
      courseIncludes,
      ratingCount,
      courseDuration,
      articles,
      codingExercises,
      downloadableResources
    });

    await newCourse.save();

    res.send('Course submitted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render the edit course page
router.get('/editcourse/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    res.render('editcourse', { course });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.use(express.static(path.join(__dirname, 'public')));

// const courseImage = req.file ? req.file.filename : null;

// Route to handle course updates
router.post('/editcourse/:courseId', upload.single('courseImage'), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseName,
      courseProfessorName,
      courseDescription,
      overviewTitle,
      overviewDescription,
      rating,
      duration,
      videos,
      liveLectures,
      curriculumTitle,
      price,
      studentsEnrolled,
      instructors,
      lastUpdated,
      languages,
      requirements,
      learningObjectives,
      courseIncludes,
      ratingCount,
      courseDuration,
      articles,
      codingExercises,
      downloadableResources
    } = req.body;

    const courseImage = req.file ? req.file.filename : null;

    // Basic validation
    if (!courseName || !courseDescription || !price) {
      return res.status(400).send('Course name, description, and price are required.');
    }

    // Convert questions from comma-separated string to array of ObjectIds
    // const questionsArray = questions.split(',').map(id => ObjectId(id.trim()));

    // Update the course details
    const updatedCourse = {
      courseName,
      courseProfessorName,
      courseDescription,
      overviewTitle,
      overviewDescription,
      rating,
      duration,
      videos,
      liveLectures,
      curriculumTitle,
      price,
      instructors,
      // questions: questionsArray,
      studentsEnrolled,
      instructors,
      lastUpdated: lastUpdated ? new Date(lastUpdated) : new Date(),
      languages,
      requirements,
      learningObjectives,
      courseIncludes,
      ratingCount,
      courseDuration,
      articles,
      codingExercises,
      downloadableResources
    };

    if (courseImage) {
      updatedCourse.courseImage = courseImage;
    }

    const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });

    if (!course) {
      return res.status(404).send('Course not found');
    }

    res.redirect('/adminpage');
  } catch (error) {
    console.error('Error updating course:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/set-exam/:courseId', async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.render('set-exam', { course });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).send('Server error');
  }
});

const chatbotController = require('../controllers/chatbotmiddleware.js');
router.use('/api', chatbotController);


module.exports = router;
