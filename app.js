const POINTS_NEEDED = 5
let playerScore = 0
let computerScore = 0

const spanPlayerScore = document.querySelector('#playerScore')
const spanComputerScore = document.querySelector('#computerScore')
showScore()

const buttons = document.querySelectorAll('button')
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
       resetScore()
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
            console.log("It's a draw!")
            break;
        case "win":
            console.log(`You win! ${playerChoice} beats ${computerChoice}`)
            break;
        case "loss":
            console.log(`You lose! ${computerChoice} beats ${playerChoice}`)
            break;
        default:
            throw new Error('Unexpected result: ' + result)
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
        console.log("You won the Game!")
    } else {
        console.log("Game Over")
    }
}

function resetScore() {
    playerScore = 0
    computerScore = 0
}