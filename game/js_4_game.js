let userScore=0;
let compScore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const userscorepara=document.querySelector("#user-score");
const compscorepara=document.querySelector("#comp-score");

choices.forEach((choice) => {
    choice.addEventListener("click" ,() =>{
        const choiceid=choice.getAttribute("id");
        playgame(choiceid);
    });
});

const drawgame=()=>{
    msg.innerText="Game was draw , Play again ! ";
    msg.style.backgroundColor="#081b31";
}

const playgame=(choiceid)=>{
    const compchoice=gencompchoice();

    if(choiceid===compchoice){
        drawgame();
    }
    else{
        let userwin=true;
        if(choiceid==='rock'){
            userwin=compchoice==='paper' ? false:true;
        }
        else if(choiceid==='paper'){
            userwin=compchoice==='scissor' ? false:true;
        }
        else{
            userwin=compchoice==='rock' ? false:true;
        }

        showwinner(userwin,choiceid, compchoice);
    }
};

const showwinner = (userwin, choiceid, compchoice) => {
    if (userwin) {
        userScore++;
        userscorepara.innerText=userScore;
        msg.innerText = `You Win! Your ${choiceid} beats ${compchoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compscorepara.innerText=compScore;
        msg.innerText = `You Lost! ${compchoice} beats your ${choiceid}`;
        msg.style.backgroundColor = "red";
    }
};


const gencompchoice=()=>{
    const options=["rock","paper","scissor"];
    const randidx=Math.floor(Math.random()*3);
    return options[randidx];
};


