const ShortAnswerQuestion = require('../models/ShortAnswerQuestion.js')
const SubjectiveAnswerQuestion = require('../models/SubjectiveAnswerQuestion.js')


module.exports = async (req, res) => {
    var selectedGrade = "3";
    var selectedSemester = "1";
    var selectedMidFinal = "mid";

    var selectedQuestionNum = 20; // 문항수
    var selectedTestLevel = 1; // 1,2,3,4,5 -> 1 이 가장 쉬움
    var tableIndex = (selectedTestLevel - 1) * 3 + selectedQuestionNum/10 - 2; // 선택한 조건에 맞는 테이블 인덱스를 계산해줘야함

    var arr = [ 
        [ // 교과 20
            [2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]
        ],
        [ // 교과 30
            [2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [2, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]
        ],
        [ // 교과 40
            [3, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [3, 4, 0, 0, 2, 0, 0, 0, 0, 0, 0],
            [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 4, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0]
        ],
        [ // 하 20
            [2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [1, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0]
        ],
        [ // 하 30
            [2, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [3, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [2, 3, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0]
        ],
        [ // 하 40
            [3, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [3, 4, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0],
            [3, 3, 0, 2, 0, 0, 1, 0, 0, 0, 0],
            [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0]
        ],
        [ // 중 20
            [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
        ],
        [ // 중 30
            [2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [1, 2, 1, 0, 1, 1, 0, 0, 0, 0, 1],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0]
        ],
        [ // 중 40
            [3, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1],
            [0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
            [2, 2, 1, 1, 1, 0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1]
        ],
        [ // 상 20
            [0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
        ],
        [ // 상 30
            [0, 2, 2, 0, 0, 1, 0, 0, 1, 0, 1],
            [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
            [0, 2, 0, 0, 2, 1, 0, 0, 1, 0, 1],
            [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 2, 0, 2, 0, 1, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
        ],
        [ // 상 40
            [0, 3, 3, 0, 0, 2, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
            [0, 2, 0, 3, 0, 2, 1, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 3, 0, 3, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1]
        ],
        [ // 최상 20
            [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0]
        ],
        [ // 최상 30
            [0, 1, 1, 0, 2, 2, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
            [0, 1, 2, 0, 1, 2, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 2, 2, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
        ],
        [ // 최상 40
            [0, 2, 2, 0, 2, 3, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 2, 0],
            [0, 1, 2, 0, 2, 2, 0, 0, 0, 0, 2],
            [0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0],
            [0, 1, 2, 0, 2, 3, 0, 0, 0, 0, 1],
            [0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0]
        ]     
    ];
   

    var questions = [];
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 6; j++) {
            if (j % 2 == 0) { // 객관식
                if (arr[tableIndex][j][i] != 0) { // 0이 아닌 값일 때만 DB에 데이터 요청
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
                    if(i%3 == 0 && i>0){ 
                        condition["독해력"] = "0"
                    }
                    const question = await ShortAnswerQuestion.find(condition);
                    // console.log(question)
                    
                    // 랜덤으로 추출하도록 수정 요
                    for(var k=0;k<arr[tableIndex][j][i];k++){
                        questions.push(question[k]);
                        if(question[k] == undefined){
                            console.log(condition)
                        }
                    }
                }
            }
            else { // 주관식
                if (arr[tableIndex][j][i] != 0) { // 0이 아닌 값일 때만 DB에 데이터 요청
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
                        "단원": String(unit + Math.floor((j / 2)))
                    }
                    if(i%3 == 0 && i>0){
                        condition["독해력"] = "0"
                    }
                    const question = await SubjectiveAnswerQuestion.find(condition);
                    console.log(question)
                    
                    // 랜덤으로 추출하도록 수정 요
                    for(var k=0;k<arr[tableIndex][j][i];k++){
                        questions.push(question[k]);
                        if(question[k] == undefined){
                            console.log(condition)
                        }
                    }
                }
            }
        }
    }

    // console.log(questions)

    // var condition = {
    //     "학년":selectedGrade, 
    //     "학기":selectedSemester, 
    //     "난이도":"1",
    // }
    // condition['단원'] = "1";
    // questions = await SubjectiveAnswerQuestion.find(condition);

    // console.log(questions)

    res.send(questions)
}