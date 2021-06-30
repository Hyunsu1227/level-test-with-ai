$(document).ready(function () {
    $("#img").load(function(){
        var img_height = $(this).height();
        console.log(img_height)

        $(".item").each(function(){
            var top = $(this).position().top;
            var height = $(this).outerHeight();
            $(this).css('bottom', height*2.6);
        })
    })
    fade_in_out_circle();    
})

function fade_in_out_circle(){
    $(".item").click(function(){
        if($(this).css("Opacity") == "1"){
            console.log("visibility")
            $(this).animate({opacity: "0"}, 500);
        }
        else{
            console.log("hidden")
            $(this).animate({opacity: "1"}, 500);
        }
    })
}

