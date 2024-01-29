
// Get DOM elements
const gameRules = document.querySelector(".rulesButton");
const closeGameRules = document.querySelector(".closeRulesButton");
const gameRulesDiv = document.querySelector(".gameRulesContainer");
const npcScoreDiv = document.querySelector(".NPCScoreDisplay");
const playerScoreDiv = document.querySelector(".playerScoreDisplay");

var playAgainBtn = document.getElementById("playAgainBtn");
var resultPlayAgainBtn = document.getElementById("mainResultPlayAgainBtn");
var nextBtn = document.getElementById("nextButton");

playAgainBtn.addEventListener("click",()=>{
    location.reload();
})

resultPlayAgainBtn.addEventListener("click",()=>{
    localStorage.clear();
    location.reload();
})

nextBtn.addEventListener("click",()=>{
    nextBtn.style.display = 'none';
    document.getElementsByClassName("scoreContainer")[0].style.display = 'none';
    document.getElementsByClassName("choiceAndResultContainer")[0].style.display = 'none';
    document.getElementsByClassName("mainResultContainer")[0].style.display = 'flex';
})

// Initialize player score from localStorage
let playerScore = {
    win: parseInt(localStorage.getItem('playerScore')) || 0,
    lose: parseInt(localStorage.getItem('npcScore')) || 0
};

updateScore();

// Event listener for rules button
gameRules.addEventListener("click", () => {
    gameRulesDiv.classList.toggle("active");
});

closeGameRules.addEventListener("click", () => {
    gameRulesDiv.classList.toggle("active");
});

// Function to get NPC choice
function getNPCChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function getWinner(player, npc) {
    if (player === npc) return 'draw';
    if (
        (player === 'rock' && npc === 'scissors') ||
        (player === 'paper' && npc === 'rock') ||
        (player === 'scissors' && npc === 'paper')
    ) {
        return 'player';
    }
    return 'npc';
}

// Function to handle player choice
function handlePlayerChoice(playerChoice) {
    document.getElementsByClassName("choiceContainer")[0].style.display = 'none';
    document.getElementsByClassName("resultContainer")[0].style.display = 'flex';

    var playerChoiceElements = document.getElementsByClassName("playerChoice");
    console.log(playerChoiceElements.length);

    if(playerChoice == 'paper'){
        document.getElementById("playerChoicePaper").style.display = 'flex';
        document.getElementById("playerChoiceScissors").style.display = 'none';
        document.getElementById("playerChoiceRock").style.display = 'none';
    } else if(playerChoice == 'scissors'){
        document.getElementById("playerChoicePaper").style.display = 'none';
        document.getElementById("playerChoiceScissors").style.display = 'flex';
        document.getElementById("playerChoiceRock").style.display = 'none';
    } else if(playerChoice == 'rock'){
        document.getElementById("playerChoicePaper").style.display = 'none';
        document.getElementById("playerChoiceScissors").style.display = 'none';
        document.getElementById("playerChoiceRock").style.display = 'flex';
    }

    // Get NPC choice asynchronously
    const npcChoice = new Promise((resolve) => {
        resolve(getNPCChoice());
    });

    // Process winner and update scores
    npcChoice.then((resolve) => {
        const gameWinner = getWinner(playerChoice, resolve);
        if (gameWinner === 'player') {
            playerScore.win++;
            document.getElementById("resultMessage").textContent = "YOU WON AGAINT PC";
            nextBtn.style.display = 'block';
        } else if (gameWinner === 'npc') {
            playerScore.lose++;
            document.getElementById("resultMessage").textContent = "YOU LOST AGAINT PC";
        } else {
            document.getElementById("resultMessage").textContent = "IT'S A DRAW";
        }
        
        if(resolve == 'paper'){
            document.getElementById("npcChoicePaper").style.display = 'flex';
            document.getElementById("npcChoiceScissors").style.display = 'none';
            document.getElementById("npcChoiceRock").style.display = 'none';
        } else if(resolve == 'scissors'){
            document.getElementById("npcChoicePaper").style.display = 'none';
            document.getElementById("npcChoiceScissors").style.display = 'flex';
            document.getElementById("npcChoiceRock").style.display = 'none';
        } else if(resolve == 'rock'){
            document.getElementById("npcChoicePaper").style.display = 'none';
            document.getElementById("npcChoiceScissors").style.display = 'none';
            document.getElementById("npcChoiceRock").style.display = 'flex';
        }

        updateScore();
        // Update localStorage scores
        localStorage.setItem('playerScore', playerScore.win);
        localStorage.setItem('npcScore', playerScore.lose);
    });
}

// Function to update score display
function updateScore() {

    playerScoreDiv.textContent = playerScore.win;
    npcScoreDiv.textContent = playerScore.lose;
    if(playerScore.win > playerScore.lose){
        document.getElementById("mainResultText").textContent = "YOU WON AGAINT PC";
        document.getElementById("resultMsg").textContent = "HURRAY!!";
    } else if(playerScore.win == playerScore.lose){
        document.getElementById("mainResultText").textContent = "IT'S A DRAW";
        document.getElementById("resultMsg").textContent = "OOPS!!";
    } else {
        document.getElementById("mainResultText").textContent = "YOU LOST AGAINT PC";
        document.getElementById("resultMsg").textContent = "OOPS!!";
    }
}
