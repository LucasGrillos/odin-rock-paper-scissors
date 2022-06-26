let startGameButton = document.querySelector('#gamestart-button');
let rpsSelectButtons = document.querySelectorAll('.rps-select-button');
let gameContent = document.querySelector(".game-content");
let playerHand = document.querySelector('.player-rps');
let computerHand = document.querySelector('.computer-rps');

let winH2 = document.querySelector('#win-msg');
let describeH2 = document.querySelector('#desc-message');

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
    startGameButton.addEventListener('click', startGame);
}, false);

const startGame = () => {
    
    startGameButton.removeEventListener('click', startGame);
    startGameButton.style.display = "none";
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
    
    let playerSelection = emojiToText[playerHand.textContent];
    let computerSelection = emojiToText[computerHand.textContent];
    let determine = determineWinState[playerSelection][computerSelection]

    console.log(playerSelection)

    gameContent.classList.toggle("message");

    winH2.textContent = `You ${determine}!`
    describeH2.textContent = `${playerSelection} ${determine}s against ${computerSelection}`
    winH2.style.display = 'block';
    describeH2.style.display = 'block';
    incrementPlayerScore();
}

const incrementPlayerScore = () => {
    let playerScore = parseInt(document.querySelector('#player-score').textContent);
    playerScore++;
    document.querySelector('#player-score').textContent = playerScore;
}

const computerPlay = () => {
    let options = ["rock", "paper", "scissors"]
    return options[Math.floor(Math.random() * 3)];
}

const playRoundOTHER = (playerSelection, computerSelection) => {
    let determineWinState = {
        "rock": {"rock": "tie", "paper": "lose", "scissors": "win"},
        "paper": {"rock": "win", "paper": "tie", "scissors": "lose"},
        "scissors": {"rock": "lose", "paper": "win", "scissors": "tie"}
    }

    let determine = determineWinState[playerSelection][computerSelection]
    console.log(`You ${determine}! ${playerSelection} ${determine}s against ${computerSelection}`)
    return determine
}

let playerWins = 0
let computerWins = 0

console.log(playerWins==computerWins 
    ? `You tie ${playerWins} games to ${computerWins}`
    : (playerWins > computerWins 
    ? `You win ${playerWins} games to ${computerWins}`
    : `You lose ${playerWins} games to ${computerWins}`))