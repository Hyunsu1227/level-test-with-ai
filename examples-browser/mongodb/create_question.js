// 객관식 문제를 excel에서 읽어와 mongodb에 저장하는 코드

const ShortAnswerQuestion = require('../models/ShortAnswerQuestion.js') // 객관식 문제 스키마 불러옴
// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');

// @breif xlsx 모듈추출
const xlsx = require( "xlsx" );

// @files 엑셀 파일을 가져온다.

const excelFile = xlsx.readFile( "소요시간.xlsx" ); // 문제가 저장된 엑셀 파일을 객체화
// @breif 엑셀 파일의 첫번째 시트의 정보를 추출

// const firstSheet = excelFile.Sheets[sheetName];       // @details 시트의 제목 추출
const firstSheet = excelFile.Sheets['3.1.3'];       // 3.1.3 시트를 객체화

// @details 엑셀 파일의 첫번째 시트를 읽어온다. 
const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } ); // 시트를 json 형태로 변형

// console.log( jsonData["독해력"] );

// 2. testDB 세팅
// mongoose.connect('mongodb://localhost:27017/testDB');
mongoose.connect('mongodb://localhost:27017/test', { // 경로는 본인이 설정할 것, 없으면 mongo에서 자동으로 생성해줌
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
    var newQuestion = new ShortAnswerQuestion(
        {
            사진: `${jsonData[i]['사진']}`,
            정답: `${jsonData[i]['정답']}`,
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

/*
// 9. 데이터 저장
newQuestion.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});
*/


/*
// 10. Student 레퍼런스 전체 데이터 가져오기
ShortAnswerQuestion.find(function(error, questions){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(questions);
    }
})
*/

// // 11. 특정 아이디값 가져오기
// Student.findOne({_id:'585b777f7e2315063457e4ac'}, function(error,student){
//     console.log('--- Read one ---');
//     if(error){
//         console.log(error);
//     }else{
//         console.log(student);
//     }
// });

// // 12. 특정아이디 수정하기
// Student.findById({_id:'585b777f7e2315063457e4ac'}, function(error,student){
//     console.log('--- Update(PUT) ---');
//     if(error){
//         console.log(error);
//     }else{
//         student.name = '--modified--';
//         student.save(function(error,modified_student){
//             if(error){
//                 console.log(error);
//             }else{
//                 console.log(modified_student);
//             }
//         });
//     }
// });

// // 13. 삭제
// Student.remove({_id:'585b7c4371110029b0f584a2'}, function(error,output){
//     console.log('--- Delete ---');
//     if(error){
//         console.log(error);
//     }

//     /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
//         어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
//         이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
//         */
//     console.log('--- deleted ---');
// });
