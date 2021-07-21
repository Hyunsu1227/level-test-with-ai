$(document).ready(function () {
    var testInfo = localStorage.getItem("testInfo") // js/choice.js 에서 받아와서 활용
    // console.log(testInfo)
    getShortAnswerQuestion()                    // 문제를 불러오는 함수. 객관식만 불러올 것이 아니므로 함수 이름 바꿀 필요성 있음.
})

$(document).ready(function () {
    $('#submit').click(function () {
        var radioVal = $('input[name="answer1"]:checked').val();
        console.log(radioVal);
    });
});

function getShortAnswerQuestion() {
    $.ajax({
        type: 'GET',
        url: 'QuestionSelection', // views/server.js의 app.get('/QuestionSelection', QuestionSelectionController); 로부터
        dataType: 'JSON',
        success: function (data) {
            question = data;
            
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i]);
                $(".sidenav").append(`<a href="#" onClick="navClick(${i})">${i + 1}</a>`)
            }
            navClick(0);
            for (var i = 0; i < data.length; i++) {
                answerForSubmit.push(0);
            }
            timer(data.length);
        },
        error: function (request, status, error) {
            alert('통신 실패')
        }
    })
}

var answerForSubmit = [] // 현재는 객관식 문제에 대한 답만 해당 배열에 저장됨. 수정이 필요

function navClick(i) {
    // 문제를 풀러 들어온 시간과 나간 시간의 차이를 계산하여 해당 문제의 소요 시간에 더해줌
    out_time = time;
    question_timer[question_num - 1] = question_timer[question_num - 1] + in_time - out_time;
    in_time = time;

    answerForSubmit[question_num - 1] = $(`input[name="answer${question_num}"]:checked`).val();
    question_num = i + 1;

    if(question[i] != null){
        if(isSubjective(question[i])){ // 주관식 문제 부분. 수정 필요
            $(".main").empty();
            // 문제 번호 및 사진 출력.
            var str = `
            <div style="position: absolute; width: 630x; height: 650px;">
                <div style="background: chartreuse; margin-top: 50px; text-align: center;">
                    <h1>Question ${i + 1}</h1>
                </div>
                <div style=" margin-top: 5px; width: 630px; height: 595px; text-align: center;">
                    <img id="question" style=" width: 600px; height: auto" src="${question[i]["사진"]}">
                    <p>정답을 고르시오.</p>
            `
            // for(var i = 0; i<question[i]["정답갯수"]; i++){
            //     str += `<input type="text" name="answer${i + 1}"></input>`
            // }
            str += `<button onclick="submit()">제출</button>`
            

            $(".main").append(str)
        }
        else{ // 객관식 문제 부분. 수정 필요.
            $(".main").empty();
            // 문제 번호 및 사진 출력.
            var str = `
            <div style="position: absolute; width: 630x; height: 650px;">
                <div style="background: chartreuse; margin-top: 50px; text-align: center;">
                    <h1>Question ${i + 1}</h1>
                </div>
                <div style=" margin-top: 5px; width: 630px; height: 595px; text-align: center;">
                    <img id="question" style=" width: 600px; height: auto" src="${question[i]["사진"]}">
                    <p>정답을 고르시오.</p>
            `

            if (answerForSubmit[question_num - 1] == 1) { // 채크했던 부분이 1이면 1이 채크된 상태로 출력
                str += `<span>
                <input type="radio" id="1" name="answer${i + 1}" value="1" checked
                >
                <label for="1">1　　</label>
                </span>`
            } else {                                    // 아니면 채크되지 않은 상태로 출력
                str += `<span>
                <input type="radio" id="1" name="answer${i + 1}" value="1"
                >
                <label for="1">1　　</label>
                </span>`
            }
            if (answerForSubmit[question_num - 1] == 2) {       // 2,3,4,5도 같은 방식.
                str += `<span>
                <input type="radio" id="2" name="answer${i + 1}" value="2" checked
                >
                <label for="2">2　　</label>
                </span>`
            } else {
                str += `<span>
                <input type="radio" id="2" name="answer${i + 1}" value="2"
                >
                <label for="2">2　　</label>
                </span>`
            }
            if (answerForSubmit[question_num - 1] == 3) {
                str += `<span>
                <input type="radio" id="3" name="answer${i + 1}" value="3" checked
                >
                <label for="3">3　　</label>
                </span>`
            } else {
                str += `<span>
                <input type="radio" id="3" name="answer${i + 1}" value="3"
                >
                <label for="3">3　　</label>
                </span>`
            }
            if (answerForSubmit[question_num - 1] == 4) {
                str += `<span>
                <input type="radio" id="4" name="answer${i + 1}" value="4" checked
                >
                <label for="4">4　　</label>
                </span>`
            } else {
                str += `<span>
                <input type="radio" id="4" name="answer${i + 1}" value="4"
                >
                <label for="4">4　　</label>
                </span>`
            }
            if (answerForSubmit[question_num - 1] == 5) {
                str += `<span>
                <input type="radio" id="5" name="answer${i + 1}" value="5" checked
                >
                <label for="5">5　　</label>
                </span>`
            } else {
                str += `<span>
                <input type="radio" id="5" name="answer${i + 1}" value="5"
                >
                <label for="5">5　　</label>
                </span>`
            }
            // 제출 버튼
            str += `<button onclick="submit()">제출</button>`
            // 메인 화면에 출력
            $(".main").append(str)
        }
    }
}

// 현재는 객관식 문제에 대한 답만 라디오 버튼을 통해 배열에 저장한 후 db의 정답과 비교. 주관식 문제도 추가해야 하므로 수정이 필요
function submit() {
    for (var i = 0; i < question.length; i++) {
        if (question[i]['정답'] == answerForSubmit[i]) {
            console.log((i + 1) + ' 정답')
        }
        else {
            console.log((i + 1) + '오답')
        }
    }
}

// 주관식 객관식 문제를 구분하기 위한 함수. 정답1 필드가 있으면 주관식 아니면 객관식.
function isSubjective(question){
    var tf = question.hasOwnProperty('정답1')
    return tf
}


