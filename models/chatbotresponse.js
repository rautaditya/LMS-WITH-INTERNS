// const mongoose = require('mongoose');

// const chatbotresponseSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     mobile: String,
//     course: String
// });

// module.exports = mongoose.model('Chatbotresponse', chatbotresponseSchema);
const mongoose = require('mongoose');

const chatbotResponseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    course: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ChatbotResponse', chatbotResponseSchema);
