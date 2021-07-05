const ShortAnswerQuestion = require('../models/ShortAnswerQuestion.js')

module.exports = async (req, res) =>{
    const short_answer_question = await ShortAnswerQuestion.find()
    // console.log(short_answer_question)
    res.send(short_answer_question)
}