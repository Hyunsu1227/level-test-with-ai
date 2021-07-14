function teststart(){
    var testInfo = {
        "selectedGrade" : $("#grade option:selected").val(),
        "selectedSemester" : $("#semester option:selected").val(),
        "selectedMidFinal" : $("#midFinal option:selected").val()
    };
    localStorage.setItem("testInfo", JSON.stringify(testInfo));
}



