

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
  downloadableResources: Number ,// Number of downloadable resources

  chapters: [{
    title: String,
    description: String,
    order: Number,
    lessons: [{
      title: String,
      content: String,
      videoUrl: String,
      order: Number,
      quizzes: [{
        question: String,
        options: [String],
        correctAnswer: Number
      }]
    }]
  }]
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
