$(document).ready(function () {
    getShortAnswerQuestion();
    // navClick();
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
                $(".main").append(`<h2>${data[0].description}</h2>`)
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
    $(".main").append(`<h2>${question[i].description}</h2>`)
}