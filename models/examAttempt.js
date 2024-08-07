const mongoose = require('mongoose');

const examAttemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedUserData' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  attemptDate: { type: Date, default: Date.now }
});

const ExamAttempt = mongoose.model('ExamAttempt', examAttemptSchema);

module.exports = ExamAttempt;