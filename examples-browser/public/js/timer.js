var time = 600; //기준시간 작성
var question_num = 1; // 문제 번호
var in_time = 600; // 들어온 시간
var out_time = 600; // 나간 시간
var question_timer = [];

function timer(num_questions){
    for(var i=0;i<num_questions;i++){
        question_timer.push(0);
    }
    console.log(question_timer);
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
