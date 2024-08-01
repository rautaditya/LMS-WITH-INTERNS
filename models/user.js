const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]

    // You can add more fields as needed, such as password, role, etc.
}, { timestamps: true });

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
