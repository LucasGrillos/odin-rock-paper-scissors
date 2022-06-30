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

const addStartGameButton = () => {
    winH2.style.display = "none";
    describeH2.style.display = "none";
    clickH2.style.display = "none";
    playerHand.style.display = "none";
    computerHand.style.display = "none";
    playerScore.textContent = "0";
    computerScore.textContent = "0";
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
    winH2.style.display = "none";
    describeH2.style.display = "none";
    clickH2.style.display = "none";
    playerHand.style.display = "none";
    computerHand.style.display = "none";
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
    computerHand.textContent = textToEmoji[computerPlay()];
    playerHand.style.animation = "hand-animation .3s";
    computerHand.style.animation = "hand-animation .3s";
    playerHand.addEventListener('animationend', playRound);
    //console.log(event.target.dataset.symbol);
}

const playRound = (event) => {
    let determineWinState = {
        "rock": {"rock": "tie", "paper": "lose", "scissors": "win"},
        "paper": {"rock": "win", "paper": "tie", "scissors": "lose"},
        "scissors": {"rock": "lose", "paper": "win", "scissors": "tie"}
    }
    playerHand.removeEventListener('animationend', playRound);
    let playerSelection = emojiToText[playerHand.textContent];
    let computerSelection = emojiToText[computerHand.textContent];
    let results = determineWinState[playerSelection][computerSelection]

    gameContent.classList.toggle("message");

    winH2.textContent = `You ${results}!`
    describeH2.textContent = `${playerSelection} ${results}s against ${computerSelection}`
    winH2.style.display = 'block';
    describeH2.style.display = 'block';
    clickH2.style.display = 'block';

    checkTie(results);
}

//toggleScores()

const checkTie = (results) => {
    const TIE = 'tie';
    results == TIE ? clickAnywhereToContinue() : checkWin(results);
}

const checkWin = (results) => {
    const WIN = 'win';
    results == WIN ? incrementPlayerScore() : incrementComputerScore();
    if(parseInt(playerScore.textContent) >= 5 || parseInt(computerScore.textContent) >= 5) {
        let winOrLose = parseInt(playerScore.textContent) >= 5 ? "win" : "lose";
        gameOver(winOrLose)
    } 
    else {
        clickAnywhereToContinue('repeat');   
    } 
}

const clickAnywhereToContinue = (restartOrRepeat) => {
    restartOrRepeat == 'restart' ? body.addEventListener('click', addStartGameButton) : body.addEventListener('click', repeatGame);
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

const computerPlay = () => {
    let options = ["rock", "paper", "scissors"]
    return options[Math.floor(Math.random() * 3)];
}

const gameOver = (winOrLose) => {
    winH2.textContent = `YOU ${winOrLose}!`
    describeH2.textContent = `${parseInt(playerScore.textContent)} games to ${parseInt(computerScore.textContent)} games`
    clickAnywhereToContinue('restart')
}