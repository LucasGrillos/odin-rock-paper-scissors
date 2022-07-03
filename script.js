let body = document.querySelector("body");
let startGameButton = document.querySelector('#gamestart-button');
let rpsSelectButtons = document.querySelectorAll('.rps-select-button');
let gameContent = document.querySelector(".game-content");
let playerHand = document.querySelector('.player-rps');
let computerHand = document.querySelector('.computer-rps');

let winH2 = document.querySelector('#win-msg');
let describeH2 = document.querySelector('#desc-message');
let clickH2 = document.querySelector('#click-message');

let playerScore = document.querySelector('#player-score');
let computerScore = document.querySelector('#computer-score');

let textToEmoji = {
    'rock': '✊',
    'paper': '✋',
    'scissors': '✌️'
};

let emojiToText = {
    '✊': 'rock',
    '✋': 'paper',
    '✌️': 'scissors'
};

window.addEventListener('load', function() {
    addStartGameButton()
}, false);


const hideMessageElements = () => {
    winH2.style.display = "none";
    describeH2.style.display = "none";
    clickH2.style.display = "none";
    playerHand.style.display = "none";
    computerHand.style.display = "none";
}


const addStartGameButton = () => {
    hideMessageElements();
    resetScores();
    body.removeEventListener('click', addStartGameButton);
    
    startGameButton.style.display = "block";
    startGameButton.addEventListener('click', startGame);
}

const startGame = () => {
    startGameButton.removeEventListener('click', startGame);
    startGameButton.style.display = "none";
    addGameButtons();
}

const repeatGame = () => {
    hideMessageElements();
    body.removeEventListener('click', repeatGame);
    addGameButtons();
}

const addGameButtons = () => {
    gameContent.classList.toggle("message");
    rpsSelectButtons.forEach( button => {
        button.style.display = 'block';
        button.addEventListener('click', playDropAnimation);
    });
}

const playDropAnimation = (event) => {

    rpsSelectButtons.forEach( button => {
        button.style.display = 'none';
        button.removeEventListener('click', playDropAnimation);
    })
    
    playerHand.style.display = "block";
    computerHand.style.display = "block";
    playerHand.textContent = textToEmoji[event.target.dataset.symbol];
    computerHand.textContent = textToEmoji[computerHandSelection()];
    playerHand.style.animation = "hand-animation .3s";
    computerHand.style.animation = "hand-animation .3s";
    playerHand.addEventListener('animationend', evaluateRound);
    //console.log(event.target.dataset.symbol);
}

const evaluateRound = (event) => {
    let determineWinState = {
        "rock": {"rock": "tie", "paper": "lose", "scissors": "win"},
        "paper": {"rock": "win", "paper": "tie", "scissors": "lose"},
        "scissors": {"rock": "lose", "paper": "win", "scissors": "tie"}
    }
    playerHand.removeEventListener('animationend', evaluateRound);
    let playerSelection = emojiToText[playerHand.textContent];
    let computerSelection = emojiToText[computerHand.textContent];
    let results = determineWinState[playerSelection][computerSelection]

    gameContent.classList.toggle("message");

    checkTie(results);
}

const checkTie = (results) => {
    const TIE = 'tie';
    results == TIE ? continueGame(results) : checkWin(results);
}


const checkWin = (results) => {
    const WIN = 'win';
    results == WIN ? incrementPlayerScore() : incrementComputerScore();
    if(parseInt(playerScore.textContent) >= 5 || parseInt(computerScore.textContent) >= 5) {
        let winOrLose = parseInt(playerScore.textContent) >= 5 ? "win" : "lose";
        gameOver(winOrLose)
    } 
    else {
        continueGame(results);   
    } 
}

const continueGame = (results) => {
    let playerSelection = emojiToText[playerHand.textContent];
    let computerSelection = emojiToText[computerHand.textContent];

    console.log("continueGame")
    winH2.textContent = `You ${results}!`
    describeH2.textContent = `${playerSelection} ${results}s against ${computerSelection}`
    displayMessageElements()
    body.addEventListener('click', repeatGame)

}

const gameOver = (winOrLose) => {
    winH2.textContent = `YOU ${winOrLose.toUpperCase()}!`
    describeH2.textContent = `${parseInt(playerScore.textContent)} games to ${parseInt(computerScore.textContent)} games`
    clickH2.textContent = '';
    displayMessageElements()
    body.addEventListener('click', addStartGameButton)
}

const displayMessageElements = () => {
    winH2.style.display = 'block';
    describeH2.style.display = 'block';
    clickH2.style.display = 'block';
}


const incrementPlayerScore = () => {
    let score = parseInt(playerScore.textContent);
    score+=1;
    playerScore.textContent = score;
}

const incrementComputerScore = () => {
    let score = parseInt(computerScore.textContent);
    score+=1;
    computerScore.textContent = score; 
}

const resetScores = () => {
    playerScore.textContent = "0";
    computerScore.textContent = "0";
}

const computerHandSelection = () => {
    let options = ["rock", "paper", "scissors"]
    return options[Math.floor(Math.random() * 3)];
}