function getComputerChoice() {
    const random = Math.floor(Math.random() * 3)

    switch (random) {
        case 0: return "rock"
        case 1: return "paper"
        case 2: return "scissors"
        default: throw new Error('Invalid computer choice: ' + random)
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a draw!"
    }

    if (playerChoice === "rock") {
        if (computerChoice === "paper") {
            return "You Lose! Paper beats Rock"
        } else {
            return "You win! Rock beats Scissors"
        }
    }

    if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
            return "You Lose! Scissors beats Paper"
        } else {
            return "You win! Paper beats Rock"
        }
    }

    if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
            return "You lose! Rock beats Scissors"
        } else {
            return "You win! Scissors beats Paper"
        }
    }
}

function playGame() {
    for (let i = 0; i < 5; i++) {
        const playerChoice = prompt("Rock, Paper, Scissors!").toLowerCase()
        const computerChoice = getComputerChoice()
        console.log(playRound(playerChoice, computerChoice))
    }
}

playGame()