// const mongoose = require("mongoose");
// // mongoose.connect("mongodb+srv://adityaraut6029:qXI7tIfi5zIuF7I9@vivaaks.1zrohzs.mongodb.net/?retryWrites=true&w=majority&appName=vivaaks/otpnewdatabaseforproject", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   serverSelectionTimeoutMS: 5000, // Set a timeout in milliseconds
// // });
// // mongoose.connect("mongodb://localhost:27017/newdatabaseforproject",{
// //   useNewUrlParser:true,
// //   useUnifiedTopology:true,
// // })

// // mongoose.connect("mongodb+srv://adityaraut6029:qXI7tIfi5zIuF7I9@my-cluster.mongodb.net/test?retryWrites=true&w=majority", 
// //      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
// //      .then(() => console.log( 'Database Connected' ))
// //      .catch(err => console.log( err ));

// // import MongoClient from 'mongodb';
// // const mongoUrl = 'mongodb+srv://adityaraut6029:qXI7tIfi5zIuF7I9@vivaaks.1zrohzs.mongodb.net/otpnewdatabaseforproject';
// // MongoClient.connect(mongoUrl, { useUnifiedTopology: true }).then(() => {
// //     console.log('success');
// // }).catch(e => {
// //     console.error(e);
// //     process.exit(1);
// // })

// const courseSchema = new mongoose.Schema({
//   courseName: String,
//   courseImage: String,
//   courseProfessorName: String,
//   courseDescription: String,
//   overviewTitle: String,
//   overviewDescription: String,
//   rating: Number,
//   duration: String,
//   videos: Number,
//   liveLectures: Number,
//   curriculumTitle: String,
//   questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
// });

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;


// // mongodb+srv://adityaraut6029:qXI7tIfi5zIuF7I9@vivaaks.1zrohzs.mongodb.net/


const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseImage: String,
  courseProfessorName: String,
  courseDescription: String,
  overviewTitle: String,
  overviewDescription: String,
  rating: Number,
  duration: String,
  videos: Number,
  liveLectures: Number,
  curriculumTitle: String,
  price: Number,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  studentsEnrolled: Number,
  instructors: [String], // Array of instructor names
  lastUpdated: Date,
  languages: [String], // Array of languages
  requirements: [String], // Array of requirements
  learningObjectives: [String], // Array of what you'll learn
  courseIncludes: [String], // Array of course includes (e.g., articles, resources)
  ratingCount: Number, // Number of ratings
  courseDuration: String, // Total duration of the course content
  articles: Number, // Number of articles included
  codingExercises: Number, // Number of coding exercises
  downloadableResources: Number // Number of downloadable resources
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
