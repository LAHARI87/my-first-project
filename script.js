const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.getElementById('reset');
const resultDiv = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            endGame(`Player ${currentPlayer} wins!`);
            return;
        }
    }
    if (cells.every(cell => cell.textContent)) {
        endGame('It\'s a draw!');
    }
}

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;
    checkWin();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function endGame(message) {
    resultMessage.textContent = message;
    resultDiv.classList.remove('hidden');
    gameActive = false;
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    resultDiv.classList.add('hidden');
}

function newGame() {
    resetGame();
    resultDiv.classList.add('hidden');
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);

resetGame(); // Initialize the game
