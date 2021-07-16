const ShortAnswerQuestion = require('../models/ShortAnswerQuestion.js')

module.exports = async (req, res) =>{
    var selectedGrade = "3" 
    var selectedSemester = "1"
    var selectedMidFinal = "mid"
    const short_answer_question = await ShortAnswerQuestion.find()
    // console.log(short_answer_q=uestion)
    res.send(short_answer_question)
}