// Get DOM elements
const gameRules = document.querySelector(".rulesButton");
const closeGameRules = document.querySelector(".closeRulesButton");
const gameRulesDiv = document.querySelector(".gameRulesContainer");
const npcScoreDiv = document.querySelector(".NPCScoreDisplay");
const playerScoreDiv = document.querySelector(".playerScoreDisplay");

const playAgainBtn = document.getElementById("playAgainBtn");
const resultPlayAgainBtn = document.getElementById("mainResultPlayAgainBtn");
const nextBtn = document.getElementById("nextButton");

playAgainBtn.addEventListener("click", () => location.reload());

resultPlayAgainBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

nextBtn.addEventListener("click", () => {
    nextBtn.style.display = 'none';
    document.querySelector(".scoreContainer").style.display = 'none';
    document.querySelector(".choiceAndResultContainer").style.display = 'none';
    document.querySelector(".mainResultContainer").style.display = 'flex';
});

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
    console.log('Player',player);
    console.log('npc',npc);
    if (player === npc) return 'draw';
    if ((player === 'rock' && npc === 'scissors') ||
        (player === 'paper' && npc === 'rock') ||
        (player === 'scissors' && npc === 'paper')) {
        return 'player';
    }
    return 'npc';
}

// Function to handle player choice display
function displayPlayerChoice(choice) {
    const choices = ['rock', 'paper', 'scissors'];
    choices.forEach(ch => {
        const element = document.getElementById(`playerChoice${ch.charAt(0).toUpperCase() + ch.slice(1)}`);
        element.style.display = ch === choice ? 'flex' : 'none';
    });
}

// Function to handle player choice
function handlePlayerChoice(playerChoice) {
    document.querySelector(".choiceContainer").style.display = 'none';
    document.querySelector(".resultContainer").style.display = 'flex';

    displayPlayerChoice(playerChoice);

    // Get NPC choice asynchronously
    const npcChoice = new Promise(resolve => resolve(getNPCChoice()));

    // Process winner and update scores
    npcChoice.then(resolve => {
        const gameWinner = getWinner(playerChoice, resolve);
        const resultMessageElement = document.getElementById("resultMessage");
        resultMessageElement.textContent = gameWinner === 'player' ? "YOU WON AGAINST PC" :
            gameWinner === 'npc' ? "YOU LOST AGAINST PC" : "TIE UP";

        playAgainBtn.textContent = gameWinner === 'draw' ? "REPLAY" : "PLAY AGAIN";

        const npcChoiceElements = document.getElementById(`npcChoice${resolve.charAt(0).toUpperCase() + resolve.slice(1)}`);
        console.log(`npcChoice${resolve.charAt(0).toUpperCase() + resolve.slice(1)}`);
        npcChoiceElements.style.display = 'flex';

        if (gameWinner === 'player') {
            playerScore.win++;
            nextBtn.style.display = 'block';
        } else if (gameWinner === 'npc') {
            playerScore.lose++;
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

    const mainResultTextElement = document.getElementById("mainResultText");
    const resultMsgElement = document.getElementById("resultMsg");

    if (playerScore.win > playerScore.lose) {
        mainResultTextElement.textContent = "YOU WON AGAINST PC";
        resultMsgElement.textContent = "HURRAY!!";
    } else if (playerScore.win === playerScore.lose) {
        mainResultTextElement.textContent = "IT'S A DRAW";
        resultMsgElement.textContent = "OOPS!!";
    } else {
        mainResultTextElement.textContent = "YOU LOST AGAINST PC";
        resultMsgElement.textContent = "OOPS!!";
    }
}
