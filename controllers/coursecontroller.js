const Course = require('../models/course');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload;

// Display the form to create a new course
exports.displayCreateCourseForm = (req, res) => {
  res.render('createCourse');
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const newCourse = new Course({
      courseName: req.body.courseName,
      courseImage: req.file ? `/uploads/${req.file.filename}` : null
    });

    const savedCourse = await newCourse.save();
    console.log("Saved Course ID:", savedCourse._id); // Debugging output

    if (!savedCourse) {
      return res.status(500).send("Failed to create course");
    }

res.redirect(`/courses/editcourse/${savedCourse._id}`);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Display the edit course form
// Display the edit course form
exports.displayEditCourseForm = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).send("Invalid Course ID");
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    res.render('editCourse', { course });  // Corrected this line
  } catch (error) {
    console.error("Error fetching course:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Update an existing course
// Update an existing course
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params; // Changed from req.params.id to req.params.courseId
    const { courseName, courseDescription, price } = req.body;

    if (!courseName || !courseDescription || !price) {
      return res.status(400).json({ error: "Course name, description, and price are required." });
    }

    const updatedCourse = {
      courseName,
      courseDescription,
      price,
      courseImage: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ success: true, message: `Course "${course.courseName}" updated successfully!`, course });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Add a new chapter to a course
exports.addChapter = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    course.chapters.push({
      title,
      description,
      order: course.chapters.length + 1, // Order can be managed dynamically
      lessons: []
    });

    await course.save();
    res.redirect(`/courses/editcourse/${courseId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add a new lesson to a chapter
exports.addLesson = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { chapterIndex, title, content, videoUrl } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    const chapter = course.chapters[chapterIndex];
    if (!chapter) {
      return res.status(404).send('Chapter not found');
    }

    chapter.lessons.push({
      title,
      content,
      videoUrl,
      order: chapter.lessons.length + 1, // Order can be managed dynamically
      quizzes: []
    });

    await course.save();
    res.redirect(`/courses/editcourse/${courseId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add a new quiz to a lesson
exports.addQuiz = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { chapterIndex, lessonIndex, question, options, correctAnswer } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    const chapter = course.chapters[chapterIndex];
    if (!chapter) {
      return res.status(404).send('Chapter not found');
    }

    const lesson = chapter.lessons[lessonIndex];
    if (!lesson) {
      return res.status(404).send('Lesson not found');
    }

    lesson.quizzes.push({
      question,
      options: options.split(',').map(opt => opt.trim()),
      correctAnswer: parseInt(correctAnswer, 10)
    });

    await course.save();
    res.redirect(`/courses/editcourse/${courseId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add a new video to a course
exports.addVideo = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, videoUrl } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    course.videos.push({
      title,
      videoUrl
    });

    await course.save();
    res.redirect(`/courses/editcourse/${courseId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// List all courses
exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.render('listCourses', { courses });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
