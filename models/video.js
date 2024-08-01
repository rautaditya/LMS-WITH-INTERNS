const mongoose = require('mongoose');

// Define the video schema
const videoSchema = new mongoose.Schema({
  title: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to the Course model
  filename: String,
  progress: { type: Number, default: 0 }, // Progress percentage, default is 0

});

// Create and export the Video model
module.exports = mongoose.model('Video', videoSchema);
