const container1 = document.getElementById("container1");
const textBackground = document.getElementById("textBackground");
const textBgEffect = document.getElementById("textBgEffect");
const author = document.getElementById("author");
const mainArea = document.getElementById("mainArea");
const timer = document.getElementById("timer");
const playBtn = document.getElementById("playBtn");
const okBtn = document.getElementById("okBtn");
const initBtn = document.getElementById("initBtn");
const printed = document.getElementById("printed");
const stopWatch = document.getElementById("stopWatch");


let sec = 0 ;
let count  = 0;
let showCount = 0;
let newRecord = [];
let records = [];
let showTime = `${new Date(0,0).getHours() < 10 ? `0${new Date(0,0).getHours()}` : new Date(0,0).getHours()}:
${new Date(0,0).getMinutes() < 10 ? `0${new Date(0,0).getMinutes()}` : new Date(0,0).getMinutes()}:
${new Date(0,0+sec).getSeconds() < 10 ? `0${new Date(0,0+sec).getSeconds()}` : new Date(0,0+sec).getSeconds()}`;
let RecordOfDays = localStorage.getItem("RecordOfDay");
function handleClick(){
    textBackground.style.animation="slidePage 0.5s ease-in-out forwards";
    textBackground.style.position="absolute";
    textBgEffect.style.display= "none";
    author.style.animation="slideAuthor 0.5s ease-in-out forwards";
    author.style.opacity="1";
    container1.style.cursor="default";
    mainArea.style.display="block";
}

function handleCount(){
    playBtn.removeEventListener("click", handleCount);
    count = setInterval(() => 
    {sec+=1;
    localStorage.setItem("savedTime", sec);
    }, 1000);
    let savedTime = localStorage.getItem("savedTime");
    if(savedTime){
        sec = JSON.parse(savedTime); //로컬스토리지에 저장하면 문자열의 형태로 저장되기 때문에 숫자로 변환하기 위해 JSON.parse를 사용
    }
    showCount = setInterval(() => timer.innerHTML = `${new Date(0,0,0,0,0,0+sec).getHours() < 10 ? `0${new Date(0,0,0,0,0,0+sec).getHours()}` : new Date(0,0,0,0,0,0+sec).getHours()}:
    ${new Date(0,0,0,0,0,0+sec).getMinutes() < 10 ? `0${new Date(0,0,0,0,0,0+sec).getMinutes()}` : new Date(0,0,0,0,0,0+sec).getMinutes()}:
    ${new Date(0,0,0,0,0,0+sec).getSeconds() < 10 ? `0${new Date(0,0,0,0,0,0+sec).getSeconds()}` : new Date(0,0,0,0,0,0+sec).getSeconds()}`,1000);
    
    playBtn.className="watch_btn_play";
    timer.style.color= "yellowgreen";

    playBtn.addEventListener("click", pauseCount);
}

function pauseCount(){
    clearInterval(showCount);
    clearInterval(count);

    playBtn.className="watch_btn";
    timer.style.color= "#9092A9";
    playBtn.removeEventListener("click", pauseCount);
    playBtn.addEventListener("click", handleCount);
}

function handleOk(){
    let totalTime = JSON.parse(localStorage.getItem("totalTime"));
    if(localStorage.getItem("totalTime"))
    {  
     totalTime += sec;
     localStorage.setItem("totalTime", totalTime);
    }else{
        localStorage.setItem("totalTime", sec);
    }
    newRecord = `${Math.floor(sec/3600)}시간 ${Math.floor(sec/60%60)}분 ${new Date().getFullYear()}년 ${new Date().getMonth()+1}월 ${new Date().getDate()}일`;
    if(localStorage.getItem("records")){
    let origin = JSON.parse(localStorage.getItem("records"))
    
    origin.push(newRecord);
    localStorage.setItem("records", JSON.stringify(origin));
    }
    else{
        records.push(newRecord);
        localStorage.setItem("records", JSON.stringify(records));
    }
    printed.style.animation = "printResult 0.7s ease-in-out forwards";
    textBackground.style.display = "none";
    author.style.display = "none";
    const ofToday = JSON.parse(localStorage.getItem("records")).filter(record => record.split("분 ")[1] === newRecord.split("분 ")[1]);
    
    let todayDate = "";
    todayDate = ofToday.map(record => record.split("분 ")[1])[0];
    let todayMinutes = 0;
    ofToday.map(record => todayMinutes += parseInt(record.split("시간")[0])*60 + parseInt(record.split(" ")[1]));
    
    let todayRecord = `${Math.floor(todayMinutes/60)}시간 ${Math.floor(todayMinutes%60)}분`;
    let todayTotal = `${todayRecord} / ${todayDate}`;
    let dayList = "";
    let recordDays = [];
    if(localStorage.getItem("totalOfDay")){
    dayList = localStorage.getItem("totalOfDay");
    
    const record1 = JSON.parse(localStorage.getItem("records"));
    console.log(record1[record1.length-2])
    if(record1[record1.length-2].split("분 ")[1] == todayTotal.split(" / ")[1]){ // 같은 날일 경우
        dayList += todayTotal;
        localStorage.setItem("totalOfDay", dayList);
        alert("시간이 추가되었습니다")
    }
    else{
        if(recordDays.length>0){
            recordDays = JSON.parse(localStorage.getItem("recordDays"));
        }
        recordDays.push(record1[record1.length-2]);
        localStorage.setItem("recordDays", JSON.stringify(recordDays));
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }else{
    localStorage.setItem("totalOfDay", todayTotal); 
    }

    let checkNull = [];
    if(JSON.parse(localStorage.getItem("recordDays")) !==null){
        checkNull = JSON.parse(localStorage.getItem("recordDays")).map(day => `${day}<br>`).join('');
    }
    printed.innerHTML = `
    <h2 class="recordTitle">총 공부시간 ${(totalTime/3600).toFixed(1)}시간 달성!</h2>
    <ul class="recordList id="recordList">
    <li class="record">${checkNull}${todayTotal}</li></ul>
   `
   const span = document.createElement("span");
   span.innerHTML = "X";
   span.className="exitPrint";
   span.id="exitPrint";
   span.addEventListener("click", handleExit);
   printed.appendChild(span);
   
   const downloadBtn = document.createElement("a");
   downloadBtn.className = "downloadBtn";
   downloadBtn.id = "downloadBtn";
   downloadBtn.innerHTML="기록 저장";
   downloadBtn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
       `총 공부시간: ${(totalTime/3600).toFixed(1)}\n공부기록\n${checkNull}${todayTotal}`));
   downloadBtn.setAttribute('download', "공부 기록");
   window.URL = window.URL || window.webkitURL;
   printed.appendChild(downloadBtn)
    handleInit()
}

function handleExit(){
    const exitPrint = document.getElementById("exitPrint");
    console.log("xdx")
    printed.style.animation="printBack 0.7s ease-in-out forwards";
    exitPrint.style.display="none";
    textBackground.style.display = "flex";
    author.style.display = "block";
}



function handleInit(){
    pauseCount();
    sec=0;
    localStorage.setItem("savedTime", sec);
    timer.innerHTML= "00:00";
}

function init(){
    
    
    container1.addEventListener("click", handleClick);
    playBtn.addEventListener("click", handleCount);
    okBtn.addEventListener("click", handleOk);
    initBtn.addEventListener("click", handleInit);
}

init();