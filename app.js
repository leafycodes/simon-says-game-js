let gameSeq=[];
let  userSeq=[];
let highscore=0;
let started=false;
let level=0;

let btns=['pink','yellow','lime','blue'];

let h2=document.querySelector('h2');
let h3=document.querySelector('h3');

document.addEventListener('keypress',function(){ 
    if(started==false){
        started=true;

        levelUp();
    }
});

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randomIdx=Math.floor(Math.random()*4);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);

    gameFlash(randomBtn);
}

function gameFlash(btn){
    btn.classList.add('gameFlash');
    setTimeout(function(){
        btn.classList.remove('gameFlash');
    },250);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    },250);
}

function btnPress(){
    if(started==false){
        return;
    }

    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute('id');
    userSeq.push(userColor);

    checkSeq(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function checkSeq(index){
    if(userSeq[index]==gameSeq[index]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
            highscore=Math.max(highscore,level*100);
            h3.innerHTML=`High Score: ${highscore}`;
        }
    }else{
        let currentScore = (level-1)*100;
        highscore = Math.max(highscore, currentScore);
        h2.innerHTML=`Game Over!<br>Your Score: <b>${currentScore}</b><br>Press any key to start`;
        h3.innerHTML=`High Score: ${highscore}`;

        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="#232323";
        },150);
        
        reset();
    }
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}