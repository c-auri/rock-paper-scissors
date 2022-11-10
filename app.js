const ROUNDS_TO_WIN = 5
let scorePlayer = 0
let scoreComputer = 0

const buttons = document.querySelectorAll("button")

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

async function playGame() {
    while (scorePlayer < ROUNDS_TO_WIN && scoreComputer < ROUNDS_TO_WIN) {
        await new Promise(resolve => {
            buttons.forEach(b => b.addEventListener("click", resolve))
        }).then(e => {
            const playerChoice = e.target.textContent
            const computerChoice = getComputerChoice()
            const roundResult = playRound(playerChoice, computerChoice)

            if (roundResult.includes("win")) {
                scorePlayer++
                console.log("Player wins round")
            } else if (roundResult.includes("Lose")) {
                scoreComputer++
                console.log("Computer wins round")
            } else {
                console.log("Draw!")
            }

            console.log(`Player ${scorePlayer} : ${scoreComputer} Computer`)
        })
    }

        const winner = scorePlayer > scoreComputer ? "Player" : "Computer"
        console.log(winner + " wins game!")
        scorePlayer = 0
        scoreComputer = 0
}

 (async function() { while (true) { await playGame() }})()