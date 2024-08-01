const mongoose = require('mongoose');

// Define the schema for the Certificate model
const certificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student' // Assuming you have a Student model
  },
  courseName: {
    type: String,
    required: true
  },
  certificateUrl: {
    type: String,
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model using the schema
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
