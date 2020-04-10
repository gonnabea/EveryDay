const container1 = document.getElementById("container1");
const textBackground = document.getElementById("textBackground");
const textBgEffect = document.getElementById("textBgEffect");
const author = document.getElementById("author");
const mainArea = document.getElementById("mainArea");
const timer = document.getElementById("timer");
const playBtn = document.getElementById("playBtn");
const okBtn = document.getElementById("okBtn");
const initBtn = document.getElementById("initBtn");

let initTime = `${new Date(0,0).getHours() < 10 ? `0${new Date(0,0).getHours()}` : new Date(0,0).getHours()}:
${new Date(0,0).getMinutes() < 10 ? `0${new Date(0,0).getMinutes()}` : new Date(0,0).getMinutes()}:
${new Date(0,0).getSeconds() < 10 ? `0${new Date(0,0).getSeconds()}` : new Date(0,0).getSeconds()}`;
console.log(initTime);

function handleClick(){
    textBackground.style.animation="slidePage 0.5s ease-in-out forwards";
    textBackground.style.position="absolute";
    textBgEffect.style.display= "none";
    author.style.animation="slideAuthor 0.5s ease-in-out forwards";
    author.style.opacity="1";
    container1.style.cursor="default";
    mainArea.style.display="block";
}


async function handleCount(){
    let sec = 0;
    await setInterval(sec+=1,1000);
    setInterval(timer.innerHTML = setInterval(new Date(0,0,0,0,0,sec),1000),1000);
}

function handleOk(){

}

function handleInit(){
    
}

function init(){
    timer.innerHTML = initTime;

    container1.addEventListener("click", handleClick);
    playBtn.addEventListener("click", handleCount);
    okBtn.addEventListener("click", handleOk);
    initBtn.addEventListener("click", handleInit);
}

init();