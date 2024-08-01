const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that the email is unique
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now, // Set the submission date automatically
  },
});

const FormSubmission = mongoose.model('FormSubmission', formSchema);

module.exports = FormSubmission;