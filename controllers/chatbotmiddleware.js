// const express = require('express');
// const router = express.Router();
// const ChatbotResponse = require('../models/chatbotresponse');

// router.post('/chatbot', async (req, res) => {
//     const { name, email, mobile, course } = req.body;
    
//     console.log('Received data:', { name, email, mobile, course }); // Add this line

//     if (!name || !email || !mobile || !course) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const chatbotResponse = new ChatbotResponse({
//         name,
//         email,
//         mobile,
//         course
//     });

//     try {
//         const savedChatbotResponse = await chatbotResponse.save();
//         res.json(savedChatbotResponse);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// //show on athe admin desk all data as table format with sorting wise 
// //backend ca route mddle ware 
// router.get('/adminpage', async (req, res) => {
//     try {
//         const chatbotResponses = await ChatbotResponse.find().sort({ createdAt: -1 });
//         res.render('adminpage', { chatbotResponses });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const ChatbotResponse = require('../models/chatbotresponse');

router.post('/chatbot', async (req, res) => {
    const { name, email, mobile, course } = req.body;

    console.log('Received data:', { name, email, mobile, course });

    if (!name || !email || !mobile || !course) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chatbotResponse = new ChatbotResponse({
        name,
        email,
        mobile,
        course
    });

    try {
        const savedChatbotResponse = await chatbotResponse.save();
        res.json(savedChatbotResponse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/adminpage', async (req, res) => {
    try {
        const chatbotResponses = await ChatbotResponse.find().sort({ createdAt: -1 });
        res.render('adminpage', { chatbotResponses });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

