const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const ShortAnswerQuestionSchema = new Schema({
  사진: String,
  정답: String,
  학년: String,
  학기: String,
  단원: String,
  유형: String,
  난이도: String,
  소요시간: String,
  개념이해력: String,
  개념적용력: String,
  개념응용력: String,
  추론력:String,
  독해력: String,
  해결책모색력:String
});

const ShortAnswerQuestion = mongoose.model('ShortAnswerQuestion',ShortAnswerQuestionSchema);
module.exports = ShortAnswerQuestion