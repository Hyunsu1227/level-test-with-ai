const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const ShortAnswerQuestionSchema = new Schema({
  description: String,
  answer: String,
  image: String
});

const ShortAnswerQuestion = mongoose.model('ShortAnswerQuestion',ShortAnswerQuestionSchema);
module.exports = ShortAnswerQuestion