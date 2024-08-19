const express = require('express');
const router = express.Router();
const courseController = require('../controllers/coursecontroller');

// Display the form to create a new course
router.get('/courses/create', courseController.displayCreateCourseForm);

// Create a new course
router.post('/courses/create', courseController.upload.single('courseImage'), courseController.createCourse);

// Display the edit course form
router.get('/courses/editcourse/:courseId', courseController.displayEditCourseForm);

// Update an existing course
router.post('/courses/editcourse/:courseId', courseController.upload.single('courseImage'), courseController.updateCourse);

// Add chapter to a course
router.post('/courses/:id/addchapter', courseController.addChapter);

// Add lesson to a chapter
router.post('/courses/:id/addlesson', courseController.addLesson);

// Add quiz to a lesson
router.post('/courses/:id/addquiz', courseController.addQuiz);

// Add video to a course
router.post('/courses/:id/addvideo', courseController.addVideo);

module.exports = router;
