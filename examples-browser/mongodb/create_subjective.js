// 주관식 문제를 excel에서 읽어와 mongodb에 저장하는 코드

const SubjectiveAnswerQuestion = require('../models/SubjectiveAnswerQuestion.js') // 주관식 문제 스키마를 불러옴

// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');

// @breif xlsx 모듈추출
const xlsx = require( "xlsx" );

// @files 엑셀 파일을 가져온다.
const excelFile = xlsx.readFile( "소요시간.xlsx" ); // 문제가 저장된 엑셀 파일을 객체화
 
const firstSheet = excelFile.Sheets['3.1.3주'];       // 3.1.3주 시트를 불러옴

const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } ); // 시트를 json 형태로 저장

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