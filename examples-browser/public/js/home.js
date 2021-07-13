$(document).ready(function () {
    getShortAnswerQuestion();
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
