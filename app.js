const ROUNDS_TO_WIN = 5
let scorePlayer = 0
let scoreComputer = 0

const spanPlayerScore = document.querySelector('#score-player')
const spanComputerScore = document.querySelector('#score-computer')
const pRoundResult = document.querySelector('#round-result')
const pGameResult = document.querySelector('#game-result')
const buttonContainer = document.querySelector('#button-container')
const buttons = document.querySelectorAll("button")

function getComputerChoice() {
    const random = Math.floor(Math.random() * 3)

    switch (random) {
        case 0: return "Rock"
        case 1: return "Paper"
        case 2: return "Scissors"
        default: throw new Error('Invalid computer choice: ' + random)
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a draw!"
    }

    if (playerChoice === "Rock") {
        if (computerChoice === "Paper") {
            return "You Lose! Paper beats Rock"
        } else {
            return "You win! Rock beats Scissors"
        }
    }

    if (playerChoice === "Paper") {
        if (computerChoice === "Scissors") {
            return "You Lose! Scissors beats Paper"
        } else {
            return "You win! Paper beats Rock"
        }
    }

    if (playerChoice === "Scissors") {
        if (computerChoice === "Rock") {
            return "You lose! Rock beats Scissors"
        } else {
            return "You win! Scissors beats Paper"
        }
    }
}

function playGame(e) {
            const playerChoice = e.target.textContent
            const computerChoice = getComputerChoice()
            const roundResult = playRound(playerChoice, computerChoice)

            if (roundResult.includes("win")) {
                scorePlayer++
            }

            if (roundResult.includes("Lose")) {
                scoreComputer++
            }

            show(roundResult)

    if (scorePlayer === ROUNDS_TO_WIN || scoreComputer === ROUNDS_TO_WIN) {
        showGameResult()
        scorePlayer = 0
        scoreComputer = 0
    }
}

function show(roundResult) {
    spanPlayerScore.innerText = scorePlayer
    spanComputerScore.innerText = scoreComputer
    pRoundResult.textContent = roundResult
}

function showGameResult() {
    if (scorePlayer > scoreComputer) {
        pGameResult.innerText = "You Won!"
    } else {
        pGameResult.innerText = "Game Over"
        toBlackScreen()
    }

    toggleVisibility(buttonContainer, pRoundResult, pGameResult)
}

function toBlackScreen() {
    document.body.classList.remove('light')
    document.body.classList.add('dark')
}

function toggleVisibility(...elements) {
    for (const element of elements) {
        if (element.getAttribute("data-visible") === "false") {
            element.setAttribute("data-visible", "true")
        } else {
            element.setAttribute("data-visible", "false")
        }
    }
}

buttons.forEach(b => b.addEventListener("click", playGame))