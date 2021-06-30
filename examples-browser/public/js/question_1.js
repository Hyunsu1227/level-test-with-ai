$(document).ready(function () {
    $("#img").load(function(){
        var img_height = $(this).height();
        console.log(img_height)

        $(".item, .item2, .item3").each(function(){
            var top = $(this).position().top;
            var height = $(this).outerHeight();
            $(this).css('bottom', height*2.6);
        })
    })
    fade_in_out_circle();    
})

function fade_in_out_circle(){
    $(".item, .item2, .item3").click(function(){
        if($(this).css("Opacity") == "0.6"){
            console.log("visibility")
            $(this).animate({opacity: "0"}, 500);
        }
        else{
            console.log("hidden")
            $(this).animate({opacity: "0.6"}, 500);
        }
    })
}

function check_the_number_of_circles(){
    var num = 0;
    $(".item, .item2, .item3").each(function(){
        if($(this).css("Opacity") == "0.6"){
            num += 1;
        }
    })
    alert("원의 개수는 " + num + "개 입니다.")
}
