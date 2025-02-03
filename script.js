document.addEventListener('DOMContentLoaded', () => {
    const player1Input = document.getElementById('player1-name');
    const player2Input = document.getElementById('player2-name');
    const startButton = document.getElementById('start-game');
    const gameContainer = document.getElementById('game-container');
    const turnIndicator = document.getElementById('turn-indicator');
    const board = document.getElementById('board');
    const squares = document.querySelectorAll('.square');
    const restartButton = document.getElementById('restart-btn');
  
    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let gameActive = false;
    let gameState = Array(9).fill('');
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    // Start Game button event
    startButton.addEventListener('click', () => {
      player1 = player1Input.value.trim() || 'Player 1';
      player2 = player2Input.value.trim() || 'Player 2';
      currentPlayer = player1;
      turnIndicator.textContent = `${currentPlayer}'s turn (X)`;
      gameContainer.classList.remove('hidden');
      gameActive = true;
      gameState = Array(9).fill('');
      squares.forEach(square => square.textContent = '');
      restartButton.classList.add('hidden');
      console.log('Start Game button clicked');
    });
  
    // Add event listener to each square
    squares.forEach((square, index) => {
      square.addEventListener('click', () => handleSquareClick(square, index));
    });
  
    // Restart button event
    restartButton.addEventListener('click', restartGame);
  
    // Function to handle a square click
    function handleSquareClick(square, index) {
      if (gameState[index] !== '' || !gameActive) return;
  
      // Place mark based on current player
      gameState[index] = currentPlayer === player1 ? 'X' : 'O';
      square.textContent = gameState[index];
  
      // Check for a winner
      if (checkWinner()) {
        turnIndicator.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        restartButton.classList.remove('hidden');
        return;
      }
  
      // Check for a draw
      if (!gameState.includes('')) {
        turnIndicator.textContent = `It's a draw!`;
        gameActive = false;
        restartButton.classList.remove('hidden');
        return;
      }
  
      // Switch players
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      turnIndicator.textContent = `${currentPlayer}'s turn (${currentPlayer === player1 ? 'X' : 'O'})`;
    }
  
    // Function to check for a winner
    function checkWinner() {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          return true;
        }
      }
      return false;
    }
  
    // Function to restart the game
    function restartGame() {
      gameState = Array(9).fill('');
      squares.forEach(square => square.textContent = '');
      gameActive = true;
      restartButton.classList.add('hidden');
      currentPlayer = player1;
      turnIndicator.textContent = `${currentPlayer}'s turn (X)`;
    }
  });
  