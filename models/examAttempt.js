// In a separate file, e.g., models/examAttempt.js
const mongoose = require('mongoose');

const examAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // Assuming you have a Student model
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' // Assuming you have a Course model
  },
  // Add other fields as needed, such as timestamps
}, { timestamps: true });

const ExamAttempt = mongoose.model('ExamAttempt', examAttemptSchema);

module.exports = ExamAttempt;
