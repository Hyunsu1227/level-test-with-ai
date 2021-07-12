$(document).ready(function () {
    getShortAnswerQuestion();
    timer();
})

var question;


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
            if(data.length > 0){
                $(".main").append(`<h2>${data[0]['문제설명']}</h2>`)
            }
            if(data.length == 0){
                console.log('no data');
            }
        },
        error: function (request, status, error) {
            alert('통신 실패')
        }
    })
}

function navClick(i){
    // console.log(question[i]);
    $(".main").empty();
    
    $(".main").append(`
        <div style="position: absolute; width: 630x; height: 880px;">
            <div style="background: chartreuse; margin-top: 50px; text-align: center;">
                <h1>Question ${i+1}</h1>
            </div>
            <div style="background: chartreuse; margin-top: 5px; width: 630px; height: 300px; text-align: center;">
                <img id="question" src="3.1/${i+1}.png">
            </div>
            <p>This sidenav is always shown.</p>
        </div>
    `)
    $(".main").append(`<h2>${question[i].description}</h2>`)
}

function timer(){
    var time = 600; //기준시간 작성
	var min = ""; //분
	var sec = ""; //초

	//setInterval(함수, 시간) : 주기적인 실행
	var x = setInterval(function() {
		//parseInt() : 정수를 반환
		min = parseInt(time/60); //몫을 계산
		sec = time%60; //나머지를 계산

		document.getElementById("timer").innerHTML = min + "분" + sec + "초";
		time--;

		//타임아웃 시
		if (time < 0) {
			clearInterval(x); //setInterval() 실행을 끝냄
			document.getElementById("timer").innerHTML = "시간초과";
		}
	}, 1000);
}
