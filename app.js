const POINTS_NEEDED = 5
let playerScore = 0
let computerScore = 0

const spanPlayerScore = document.querySelector('#score-player')
const spanComputerScore = document.querySelector('#score-computer')
const pResult = document.querySelector('#p-result')
showScore()
show()

const endResult = document.querySelector('#endresult')
const btnStartOver = document.querySelector('#btn-start-over')
btnStartOver.addEventListener('click', (e) => {
    resetScore()
    showScore()
    toggleView()
    show()
    intoTheLight()
})

const buttonContainer = document.querySelector('#button-container')
const buttons = document.querySelectorAll('.btn-choice')
buttons.forEach((b) => b.addEventListener('click', playRound))

function playRound(e) {
    const playerChoice = e.target.getAttribute('data-value')
    const computerChoice = getComputerChoice()

    const result = getResult(playerChoice, computerChoice)
    show(result, playerChoice, computerChoice)
    updateScore(result)
    showScore()

    if (somebodyWon()) {
        announceWinner()
        showScore()
        toggleView()
    }
}

function getComputerChoice() {
    const random = Math.floor(Math.random() * 3)

    switch (random) {
        case 0: return "Rock"
        case 1: return "Paper"
        case 2: return "Scissors"
        default: throw new Error('Invalid computer choice: ' + random)
    }
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw"
    } else if (playerWon(playerChoice, computerChoice)) {
        return "loss"
    } else {
        return "win"
    }
}

function playerWon(playerChoice, computerChoice) {
    return playerChoice === "Paper" && computerChoice === "Rock"
        || playerChoice === "Scissors" && computerChoice === "Paper"
        || playerChoice === "Rock" && computerChoice === "Scissors"
}

function show(result, playerChoice, computerChoice) {
    switch (result) {
        case "draw":
            pResult.innerText = "It's a draw!"
            break;
        case "win":
            pResult.innerText = `You win! ${playerChoice} beats ${computerChoice}`
            break;
        case "loss":
            pResult.innerText = `You lose! ${computerChoice} beats ${playerChoice}`
            break;
        default:
            pResult.innerText = ""
    }
}

function updateScore(result) {
    switch (result) {
        case "win":
            playerScore++;
            break;
        case "loss":
            computerScore++;
        default:
            // tie, no update
            break;
    }
}

function showScore() {
    spanPlayerScore.innerText = playerScore
    spanComputerScore.innerText = computerScore
}


function somebodyWon() {
    return playerScore === POINTS_NEEDED || computerScore === POINTS_NEEDED
}

function announceWinner() {
    if (playerScore > computerScore) {
        endResult.innerText = "You Won!"
    } else {
        intoTheDarkness()
        endResult.innerText = "Game Over"
    }
}

function resetScore() {
    playerScore = 0
    computerScore = 0
}

function intoTheLight() {
    document.body.classList.add('light')
    document.body.classList.remove('dark')
}

function intoTheDarkness() {
    document.body.classList.add('dark')
    document.body.classList.remove('light')
}

function toggleView() {
    toggleVisibility(buttonContainer, pResult, endResult, btnStartOver)
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