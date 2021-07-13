$(document).ready(function () {
    getShortAnswerQuestion();
})

$(document).ready(function () {
    $('#submit').click(function () {
      // getter
      var radioVal = $('input[name="answer1"]:checked').val();
      console.log(radioVal);
    });
});

function getShortAnswerQuestion(){
    $.ajax({
        type: 'GET',
        url: 'ShortAnswerQuestion',
        dataType: 'JSON',
        success: function (data) {  
            question = data;
            console.log(data);
            for(var i=0;i<data.length;i++){
                console.log(data[i]);
                $(".sidenav").append(`<a href="#" onClick="navClick(${i})">${i+1}</a>`)
            }
            navClick(0);
        
            for(var i=0;i<data.length;i++){
                answerForSubmit.push(0);
            }
            timer(data.length);

        },
        error: function (request, status, error) {
            alert('통신 실패')
        }
    })
}

var answerForSubmit = []

function navClick(i){
    out_time = time;
    question_timer[question_num - 1] = question_timer[question_num - 1] + in_time - out_time;
    in_time = time;

    answerForSubmit[question_num - 1] = $(`input[name="answer${question_num}"]:checked`).val();

    question_num = i + 1;

    console.log(answerForSubmit);


    $(".main").empty();
    
    var str = `
    <div style="position: absolute; width: 630x; height: 650px;">
        <div style="background: chartreuse; margin-top: 50px; text-align: center;">
            <h1>Question ${i+1}</h1>
        </div>
        <div style=" margin-top: 5px; width: 630px; height: 595px; text-align: center;">
            <img id="question" style=" width: 600px; height: auto" src="3.1.1/${i+1}.png">
            <p>정답을 고르시오.</p>
    `

    if(answerForSubmit[question_num - 1] == 1){
        str += `<span>
        <input type="radio" id="1" name="answer${i+1}" value="1" checked
        >
         <label for="1">1　　</label>
        </span>`
    }else{
        str += `<span>
        <input type="radio" id="1" name="answer${i+1}" value="1"
        >
         <label for="1">1　　</label>
        </span>`
    }
    if(answerForSubmit[question_num - 1] == 2){
        str += `<span>
        <input type="radio" id="2" name="answer${i+1}" value="2" checked
        >
         <label for="2">2　　</label>
        </span>`
    }else{
        str += `<span>
        <input type="radio" id="2" name="answer${i+1}" value="2"
        >
         <label for="2">2　　</label>
        </span>`
    }
    if(answerForSubmit[question_num - 1] == 3){
        str += `<span>
        <input type="radio" id="3" name="answer${i+1}" value="3" checked
        >
         <label for="3">3　　</label>
        </span>`
    }else{
        str += `<span>
        <input type="radio" id="3" name="answer${i+1}" value="3"
        >
         <label for="3">3　　</label>
        </span>`
    }
    if(answerForSubmit[question_num - 1] == 4){
        str += `<span>
        <input type="radio" id="4" name="answer${i+1}" value="4" checked
        >
         <label for="4">4　　</label>
        </span>`
    }else{
        str += `<span>
        <input type="radio" id="4" name="answer${i+1}" value="4"
        >
         <label for="4">4　　</label>
        </span>`
    }
    if(answerForSubmit[question_num - 1] == 5){
        str += `<span>
        <input type="radio" id="5" name="answer${i+1}" value="5" checked
        >
         <label for="5">5　　</label>
        </span>`
    }else{
        str += `<span>
        <input type="radio" id="5" name="answer${i+1}" value="5"
        >
         <label for="5">5　　</label>
        </span>`
    }
    str += `<button onclick="submit()">제출</button>`
    $(".main").append(str)
}

function submit(){
    for (var i=0; i < question.length; i++){
    	if (question[i]['정답'] == answerForSubmit[i]){
            console.log(i+' 정답')
        }
        else{
            console.log(i+ '오답')
        } 
    }

}


