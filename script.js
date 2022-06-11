const computerPlay = () => {
    let options = ["rock", "paper", "scissors"]
    return options[Math.floor(Math.random() * 3)];
}

const playRound = (playerSelection, computerSelection) => {
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