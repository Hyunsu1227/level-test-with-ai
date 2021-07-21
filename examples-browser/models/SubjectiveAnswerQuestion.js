// 주관식 문제 스키마

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const SubjectiveAnswerQuestionSchema = new Schema({
  사진: String,
  정답1: String,
  단위1: String,
  정답2: String,
  단위2: String,
  정답3: String,
  단위3: String,
  정답4: String,
  단위4: String,
  정답5: String,
  단위5: String,
  정답6: String,
  단위6: String,
  정답갯수: String,
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
  해결책모색력:String,
  문제갯수:String
});

const SubjectiveAnswerQuestion = mongoose.model('SubjectiveAnswerQuestion',SubjectiveAnswerQuestionSchema);
module.exports = SubjectiveAnswerQuestion