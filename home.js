const container1 = document.getElementById("container1");

function handleClick(){
    container1.style.animation="slidePage 0.5s ease-in-out forwards";
}


function init(){
    container1.addEventListener("click", handleClick);
}

init();