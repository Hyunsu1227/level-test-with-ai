
// @breif xlsx 모듈추출
const xlsx = require( "xlsx" );


// @files 엑셀 파일을 가져온다.
const excelFile = xlsx.readFile( "소요시간.xlsx" );

// @breif 엑셀 파일의 첫번째 시트의 정보를 추출
const sheetName = excelFile.SheetNames[0];          // @details 첫번째 시트 정보 추출
const firstSheet = excelFile.Sheets[sheetName];       // @details 시트의 제목 추출



// @details 엑셀 파일의 첫번째 시트를 읽어온다.

const jsonData = {};
let i = excelFile.SheetNames.length;

while (i--) {
    const sheetname = excelFile.SheetNames[i];
    jsonData[sheetname] = xlsx.utils.sheet_to_json(excelFile.Sheets[sheetname]);
    console.log(sheetname);
}

console.log(jsonData)






