// Single player dice game

//1. Roll fn: Create a function for rolling the dice - that will generate random number between 1 to 6, adds the results up.
//If player rolls 1, they lose. If player reaches 20, they win.

let dice;
let totalScore = 0;
let currentHighScore = 20;
let gamePlaying;

//Key = Player Name + id 
//Value = HighScores
let playerDB = []
var playerName

const totalPoints = document.querySelector("#totalPoints");


let diceImgs = {
    dice1:'img/bnw-dice/dice1.png',
    dice2:'img/bnw-dice/dice2.png',
    dice3:'img/bnw-dice/dice3.png',
    dice4:'img/bnw-dice/dice4.png',
    dice5:'img/bnw-dice/dice5.png',
    dice6:'img/bnw-dice/dice6.png'
  }

const throwDice = () => {
    //1.Generate random number  
        dice = Math.floor((Math.random() * 6) + 1);

    //2.Display result
        //   const score = document.querySelector("#point");
        //   score.innerHTML = dice;

        const diceDOM = document.querySelector("#diceImgDOM");
        diceDOM.classList.remove("no-display");
        diceDOM.src = diceImgs['dice' + dice];

    //3. If dice = 1, player loses
        
        if (dice === 1) {
            const loseMsg = document.querySelector("#display-lose");
            loseMsg.innerHTML = '💀 YOU LOSE! You rolled 1!';
            addScore()
            totalScore=0;
            toggleBtn(rollBtn);
        } else {
            hideMsg()
            totalScore += dice;
            totalPoints.innerHTML = totalScore;
        }
}

//HIDE MESSAGES
const hideMsg = () => {
    document.querySelector("#display-lose").innerHTML = '';
    document.querySelector("#display-win").innerHTML = '';
}


//START GAME BY ROLLING THE DICE
const rollBtn = document.querySelector("#roll-btn");
rollBtn.addEventListener("click",  throwDice)

//DISABLE BUTTONS 
// const disableBtn = (btn, time) => {
//     btn.disabled=true;
//     setTimeout(function(){
//         btn.disabled=false;
//     }, time);
// }

const toggleBtn = (btn) => {
    if (btn.disabled === true) {
        btn.disabled = false;
    } else if (btn.disabled === false) {
        btn.disabled = true;
    };
}


//RESET GAME
const reset = () => {
    totalScore = 0;
    document.querySelector("#diceImgDOM").classList.add("no-display");
    totalPoints.textContent='0';
    hideMsg();
    toggleBtn(rollBtn);

}

function setAction(){
    let form = document.getElementById("PlayerForm")
    let gameBoard = document.getElementById("board")

    playerName = document.getElementById("pname").value

    let PlayerObj = {Name : playerName, HighScore: 0}

    playerDB.push(PlayerObj);

    console.log("FORM ACTION TAKEN", PlayerObj)

    form.style.display = 'none'
    gameBoard.style.display = 'block'
    document.getElementById('PLAYERID').innerHTML = 'Player: ' + playerName
    document.getElementById('highScore').innerHTML = 'Current High Score: ' + currentHighScore
}

function addScore() {
    playerDB.forEach(player => {
        console.log(player)
        if (player.Name == playerName && totalScore > player.HighScore){
            player.HighScore = totalScore

            console.log("UPDATED SCORE: ", player.Scores)
            console.log("FOr PLAYER: ", player.Name)
        }

        if (player.HighScore > currentHighScore){
            currentHighScore = player.HighScore
            document.getElementById('highScore').innerHTML = 'Current High Score: ' + currentHighScore
        }
    })

    
}

function gameOver() {
    if (totalScore > 0) {
        const winMsg = document.querySelector("#display-win");
        winMsg.innerHTML = 'CONGRATULATIONS! YOU WON 🎉';
        addScore()
        totalScore = 0;
        EndGame = false
        toggleBtn(rollBtn);
        return;
    }
}

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", reset);