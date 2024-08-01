const quizResultSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    date: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
  });
  
  const QuizResult = mongoose.model('QuizResult', quizResultSchema);