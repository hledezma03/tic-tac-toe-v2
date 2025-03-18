const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const Gameboard = (function () {
  let board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = '';
  }
  
  const getBoard = () => board;

  const makeMove = (cell, player) => {
    if (board[cell] === "") {
        board[cell] = player
        return true;
      } else {
        return false;
      }
  }




  return {board, getBoard, makeMove};
})();

const GameController = (function(
  playerOneName = "Player One",
  playerTwoName = "Player Two",
) {
  const board = Gameboard;

  const players = [
    {
      name: playerOneName,
      marker: 'X'
    },
    {
      name: playerTwoName,
      marker: 'O'
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;



  const checkWinner = () => {
    const currentBoard = board.getBoard();
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return false
  }

  const checkTie = () => {
    for (const cell of board.getBoard()) {
      if (cell == '') {
        return false;
      }
    }
    return true;
  };

  const playRound = (cell) => {
    const moveDone = board.makeMove(cell, getActivePlayer().marker);
    
    if (moveDone == false) {
      return;
    } else {
      const winner = checkWinner();
      const gameWinner = document.querySelector(".game-winner")
      if (winner) {
        gameWinner.textContent = `Winner: ${getActivePlayer().name}!`
      } 
      
      const tie = checkTie();
      if (tie) {
        gameWinner.textContent = `It's a tie!`
      }
      
      switchPlayerTurn();
    };
  };


  return {playRound, getActivePlayer, switchPlayerTurn, checkWinner, checkTie, getBoard: board.getBoard};
})();

const ScreenController = (function () {
  const game = GameController;
  const playerTurnDiv = document.querySelector('.current-player');
  const resetBtn = document.querySelector('.reset-game')
  const gameboard = document.querySelector('.gameboard');

  
  const updateScreen = () => {
    gameboard.textContent = "";
    
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
    
    board.forEach((cell, index)=> {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.textContent = cell;
      cellButton.dataset.index = index;
      gameboard.appendChild(cellButton);
    });
  };

  const enableButtons = () => {
    const buttons = document.querySelectorAll('.cell');
    buttons.forEach(button => {
      button.disabled = false;
    })
  }

  const disableButtons = () => {
    const buttons = document.querySelectorAll('.cell');
    buttons.forEach(button => {
      button.disabled = true;
    })
  }
  
  const resetGame = () => {
    gameboard.textContent = "";
    Gameboard.board.fill('');
    if (game.getActivePlayer().marker === 'O') {game.switchPlayerTurn();
    }
    const gameWinner = document.querySelector('.game-winner');
    gameWinner.textContent = '';
    enableButtons();
    updateScreen();
  }

  
  const clickHadlerBoard = (e) => {
    const selectedCell = e.target.dataset.index;
    
    if (!selectedCell) return;
    
    game.playRound(selectedCell);
    updateScreen();

    const winner = game.checkWinner();
    const tie = game.checkTie();

    if (winner || tie) {
      disableButtons();
    }
  };
  gameboard.addEventListener("click", clickHadlerBoard);
  resetBtn.addEventListener("click", resetGame)

  updateScreen();
})();

ScreenController;
