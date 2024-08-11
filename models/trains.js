import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
  type: {
    trim: true,
    type: String
  },
  incorrect_answers: [{type:String}],
  difficulty: {
    type: String,
    maxlength: 100,
  },
  category: {
    type: String,
    maxlength: 100,
  },
  question: {
    type: String,
  },
  correct_answer: {
    type : String
  }
});

const questions = mongoose.model("questions", QuestionSchema);

export default questions;
