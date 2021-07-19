const SubjectiveAnswerQuestion = require('../models/SubjectiveAnswerQuestion.js')

// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');



// @breif xlsx 모듈추출

const xlsx = require( "xlsx" );



// @files 엑셀 파일을 가져온다.

const excelFile = xlsx.readFile( "소요시간.xlsx" );



// @breif 엑셀 파일의 첫번째 시트의 정보를 추출

// const sheetName = excelFile.SheetNames[4];          // @details 첫번째 시트 정보 추출

// const firstSheet = excelFile.Sheets[sheetName];       // @details 시트의 제목 추출
const firstSheet = excelFile.Sheets['3.1.3주'];       // @details 시트의 제목 추출


// @details 엑셀 파일의 첫번째 시트를 읽어온다.

const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } );

// 2. testDB 세팅
// mongoose.connect('mongodb://localhost:27017/testDB');
mongoose.connect('mongodb://localhost:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true    
});
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});


// 8. Student 객체를 new 로 생성해서 값을 입력


console.log(jsonData[0]['문제설명']);

for(var i=0;i<jsonData.length;i++){
    var newQuestion = new SubjectiveAnswerQuestion(
        {
            사진: `${jsonData[i]['사진']}`,
            정답1: `${jsonData[i]['정답1']}`,
            단위1: `${jsonData[i]['단위1']}`,
            정답2: `${jsonData[i]['정답2']}`,
            단위2: `${jsonData[i]['단위2']}`,
            정답3: `${jsonData[i]['정답3']}`,
            단위3: `${jsonData[i]['단위3']}`,
            정답4: `${jsonData[i]['정답4']}`,
            단위4: `${jsonData[i]['단위4']}`,
            정답5: `${jsonData[i]['정답5']}`,
            단위5: `${jsonData[i]['단위5']}`,
            정답6: `${jsonData[i]['정답6']}`,
            단위6: `${jsonData[i]['단위6']}`,
            정답갯수: `${jsonData[i]['정답갯수']}`,
            학년: `${jsonData[i]['학년']}`,
            학기: `${jsonData[i]['학기']}`,
            단원: `${jsonData[i]['단원']}`,
            유형: `${jsonData[i]['유형']}`,
            난이도: `${jsonData[i]['난이도']}`,
            소요시간: `${jsonData[i]['소요시간']}`,
            개념이해력: `${jsonData[i]['개념이해력']}`,
            개념적용력: `${jsonData[i]['개념적용력']}`,
            개념응용력: `${jsonData[i]['개념응용력']}`,
            추론력: `${jsonData[i]['추론력']}`,
            독해력: `${jsonData[i]['독해력']}`,
            해결책모색력: `${jsonData[i]['해결책모색력']}`});
            

            newQuestion.save(function(error, data){
                if(error){
                    console.log(error);
                }else{
                    console.log('Saved!')
                }
            });

            
}