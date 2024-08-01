const mongoose = require('mongoose');

// Connect to MongoDB


// Create MongoDB Schema
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
