const ShortAnswerQuestion = require('../models/ShortAnswerQuestion.js')

module.exports = async (req, res) => {
    var selectedGrade = "3";
    var selectedSemester = "1";
    var selectedMidFinal = "mid";

    var arr = [
        [2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ];

    var questions = [];
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 6; j++) {
            if (j % 2 == 0) { // 객관식
                if (arr[j][i] != 0) { // 0이 아닌 값일 때만 DB에 데이터 요청
                    var question_level = "0"; // 난이도
                    if (i < 2) {
                        question_level = String(i + 1);
                    } else if (i >= 2 && i <= 4) {
                        question_level = "3";
                    } else if (i >= 5 && i <= 7) {
                        question_level = "4";
                    } else {
                        question_level = "5";
                    }

                    var unit; // 단원
                    if (selectedMidFinal == 'mid') {
                        unit = 1;
                    } else if (selectedMidFinal == 'final') {
                        unit = 4;
                    }

                    var condition = {
                        "학년": selectedGrade,
                        "학기": selectedSemester,
                        "난이도": question_level,
                        "단원": String(unit + (j / 2))
                    }
                    const question = await ShortAnswerQuestion.find(condition);
                    // console.log(question)
                    
                    for(var k=0;k<arr[j][i];k++){
                        questions.push(question[k]);
                        if(question[k] == undefined){
                            console.log(condition)
                        }
                    }
                    
                    // var k=0;
                    // while(k<arr[j][i]){
                    //     if(question.length > 0){
                    //         var moveQuestion = question.splice(Math.floor(Math.random() * question.length),1)[0]
                    //         questions.push(moveQuestion)
                    //     }
                    //     k++;
                    // }
                    // console.log(i + j)
                    // console.log(questions)
                }
            }
            else { // 주관식

            }
        }
    }
    console.log(questions)

    // var condition = {
    //     "학년":selectedGrade, 
    //     "학기":selectedSemester, 
    //     "난이도":"1",
    // }
    // condition['단원'] = "1";
    // questions = await ShortAnswerQuestion.find(condition);

    // console.log(questions)
    // console.log(short_answer_question)
    res.send(questions)
}