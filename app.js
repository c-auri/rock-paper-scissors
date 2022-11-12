const POINTS_NEEDED = 5
let scorePlayer = 0
let scoreComputer = 0

const spanScorePlayer = document.querySelector('#score-player')
const spanScoreComputer = document.querySelector('#score-computer')
const pRoundResult = document.querySelector('#round-result')
const pEndResult = document.querySelector('#end-result')
const buttonContainer = document.querySelector('#button-container')
const buttons = document.querySelectorAll('.btn-choice')
const btnStartOver = document.querySelector('#btn-start-over')

btnStartOver.addEventListener('click', startOver)
buttons.forEach((b) => b.addEventListener('click', playRound))

function startOver(e) {
    resetRoundResult()
    updateScore("reset")
    changeTheme("light")
    toggleView()
}

function playRound(e) {
    const playerChoice = e.target.getAttribute('data-value')
    const computerChoice = getComputerChoice()

    const result = getResult(playerChoice, computerChoice)
    show(result, playerChoice, computerChoice)
    updateScore(result)

    if (somebodyWon()) {
        announceWinner()
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
        return "win"
    } else {
        return "loss"
    }
}

function playerWon(playerChoice, computerChoice) {
    return playerChoice === "Paper" && computerChoice === "Rock"
        || playerChoice === "Scissors" && computerChoice === "Paper"
        || playerChoice === "Rock" && computerChoice === "Scissors"
}

function show(roundResult, playerChoice, computerChoice) {
    switch (roundResult) {
        case "draw":
            pRoundResult.innerText = "It's a draw!"
            break;
        case "win":
            pRoundResult.innerText = `You win! ${playerChoice} beats ${computerChoice}.`
            break;
        case "loss":
            pRoundResult.innerText = `You lose! ${computerChoice} beats ${playerChoice}.`
            break;
        case "":
            pRoundResult.innerText = ""
            break;
    }
}

function resetRoundResult() {
    show("")
}

function updateScore(result) {
    switch (result) {
        case "win":
            scorePlayer++;
            break;
        case "loss":
            scoreComputer++;
            break;
        case "reset":
            scorePlayer = 0
            scoreComputer = 0
            break;
        case "draw":
        default:
            // no update
            break;
    }

    spanScorePlayer.innerText = scorePlayer
    spanScoreComputer.innerText = scoreComputer
}


function somebodyWon() {
    return scorePlayer === POINTS_NEEDED || scoreComputer === POINTS_NEEDED
}

function announceWinner() {
    if (scorePlayer > scoreComputer) {
        pEndResult.innerText = "You Won!"
    } else {
        pEndResult.innerText = "Game Over"
        changeTheme("dark")
    }
}

function toggleView() {
    toggleVisibility(buttonContainer, pRoundResult, pEndResult, btnStartOver)
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

function changeTheme(theme) {
    document.body.setAttribute("data-theme", theme)
}