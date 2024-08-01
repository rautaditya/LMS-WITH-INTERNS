// quizResultModel.js

const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().toISOString().split("T")[0],
  },
  dayOfWeek: {
    type: String,
    validate: {
      validator: function (value) {
        // Ensure that the day of the week is a valid string
        const validDays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return validDays.includes(value);
      },
      message: "{VALUE} is not a valid day of the week",
    },
    default: function () {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const today = new Date();
      return days[today.getDay()];
    },
  },
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

module.exports = QuizResult;
