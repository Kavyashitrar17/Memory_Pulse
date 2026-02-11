const btnColors = ["orange","blue","red","green"];

let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let speed = 900;


const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const difficulty = document.getElementById("difficulty");

const levelTitle = document.getElementById("levelTitle");
const scoreText = document.getElementById("scoreText");
const highScoreText = document.getElementById("highScore");

const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");


let highScore = localStorage.getItem("memoryPulseHigh") || 0;
highScoreText.innerText = `High Score: ${highScore}`;


const sounds = {
    orange: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    wrong: new Audio("https://www.myinstants.com/media/sounds/wrong-answer.mp3")
};



startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    speed = parseInt(difficulty.value);
    started = true;
    levelUp();
});



function flash(btn){
    btn.classList.add("flash");
    sounds[btn.id].play();

    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    sounds[btn.id].play();

    setTimeout(()=>{
        btn.classList.remove("userFlash");
    },200);
}



function levelUp(){
    userSeq = [];
    level++;

    levelTitle.innerText = `Level ${level}`;
    scoreText.innerText = `Score: ${level-1}`;

    const randColor = btnColors[Math.floor(Math.random()*4)];
    gameSeq.push(randColor);

    const btn = document.getElementById(randColor);

    setTimeout(()=>{
        flash(btn);
    },speed);
}



document.querySelectorAll(".game-btn").forEach(btn=>{
    btn.addEventListener("click",function(){

        if(!started) return;

        userFlash(this);
        const color = this.id;
        userSeq.push(color);

        checkAnswer(userSeq.length-1);
    });
});



function checkAnswer(index){

    if(userSeq[index] === gameSeq[index]){

        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }

    }else{
        gameOver();
    }
}



function gameOver(){

    sounds.wrong.play();
    document.body.classList.add("game-fail");

    setTimeout(()=>{
        document.body.classList.remove("game-fail");
    },300);

    finalScore.innerText = `Your Score: ${level-1}`;
    gameOverScreen.classList.remove("hidden");

    
    if(level-1 > highScore){
        highScore = level-1;
        localStorage.setItem("memoryPulseHigh", highScore);
    }

    highScoreText.innerText = `High Score: ${highScore}`;

    resetGame();
}



restartBtn.addEventListener("click", ()=>{
    gameOverScreen.classList.add("hidden");
    levelUp();
});



function resetGame(){
    started = true;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

