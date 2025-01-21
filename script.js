const board = document.querySelectorAll('.square');
const turnIndicator = document.getElementById('turn-indicator');
const restartBtn = document.getElementById('restart-btn');
const startGameBtn = document.getElementById('start-game');
const boardElement = document.getElementById('board');
const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '';
let playerNames = ['', ''];
let gameActive = false;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

startGameBtn.addEventListener('click', startGame);

function startGame() {
    playerNames[0] = player1Input.value || 'Player 1';
    playerNames[1] = player2Input.value || 'Player 2';
    currentPlayer = playerNames[0];
    gameActive = true;
    turnIndicator.textContent = `${currentPlayer}'s turn`;
    boardElement.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
    startGameBtn.classList.add('hidden');
    player1Input.disabled = true;
    player2Input.disabled = true;
}

board.forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(square, index));
});

function handleSquareClick(square, index) {
    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        square.textContent = currentPlayer === playerNames[0] ? 'X' : 'O';
        square.classList.add('clicked');
        
        if (checkWinner()) {
            turnIndicator.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
        } else if (boardState.every(cell => cell !== '')) {
            turnIndicator.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === playerNames[0] ? playerNames[1] : playerNames[0];
            turnIndicator.textContent = `${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] === currentPlayer && boardState[a] === boardState[b] && boardState[b] === boardState[c];
    });
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = playerNames[0];
    turnIndicator.textContent = `${currentPlayer}'s turn`;
    board.forEach(square => {
        square.textContent = '';
        square.classList.remove('clicked');
    });
}
