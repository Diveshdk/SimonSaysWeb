let gameSeq=[];
let userSeq=[];
let oldScore = 0;
let btns = ["yellow","red", "green","purple"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");
let start = document.querySelector("#start");
start.addEventListener("click", function(){
    if(started === false){
    console.log("game started");
    started = true;
    levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{btn.classList.remove("flash")},250);
}


function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    btnFlash(randbtn);
    gameSeq.push(randColor);
}


function checkAns(idx){
     if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length)
        setTimeout(levelUp, 1000);
     }
     else {
        let final = highScore(level);
        h3.innerHTML=`Game over! Your score was <b> ${level}</b></br> Highest Score is ${final} </br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000);
        reset();
     }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function highScore(level) {
    let newScore = level;
    if (newScore > oldScore) {
        oldScore = newScore;
    }
    return oldScore;
}
