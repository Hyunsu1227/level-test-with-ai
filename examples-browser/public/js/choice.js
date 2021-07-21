// 시험 조건 선택을 완료하고 시험 페이지에 선택한 조건을 넘겨주기 위한 코드
// view/choce.html에서 버튼으로 onclick으로 해당 함수를 실행

function teststart(){ 
    var testInfo = {
        "selectedGrade" : $("#grade option:selected").val(),
        "selectedSemester" : $("#semester option:selected").val(),
        "selectedMidFinal" : $("#midFinal option:selected").val()
    }
    localStorage.setItem("testInfo", JSON.stringify(testInfo));
    // 로컬 스토리지에 저장. home.js에서 var testInfo = localStorage.getItem("testInfo")을 이용하여 testInfo를 통해 선택한 조건 활용 가능.
}



