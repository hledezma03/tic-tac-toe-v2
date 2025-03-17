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
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = '';
  }
  
  const getBoard = () => board;

  const makeMove = (cell, player) => {
    if (board[cell] === '') {
        board[cell] = player
        return true;
      } else {
        return false;
      }
  }

  const printBoard = () => {
    return console.log(board);
  };


  return {getBoard, makeMove, printBoard};
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

  const printNewRound = () => {
    board.printBoard();
    return console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkWinner = () => {
    const currentBoard = board.getBoard();
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return true
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
      console.log(`This cell is not available. Try again!`);
      return;
    } else {
      const winner = checkWinner();
      if (winner) {
        console.log(`Winner: ${getActivePlayer().name}`);
        board.printBoard();
        return;
      } 
      
      const tie = checkTie();
      if (tie) {
        return;
      }
      
      console.log(`${getActivePlayer().name} marked thecell ${cell}...`);
      switchPlayerTurn();
      printNewRound();
    };
  };


  return {playRound, getActivePlayer, getBoard: board.getBoard};
})();

const ScreenController = (function () {
  const game = GameController;
  const playerTurnDiv = document.querySelector('.current-player');
  const gameboard = document.querySelector('.gameboard');

  const updateScreen = () => {
    gameboard.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    board.forEach((index)=> {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset = index;
      gameboard.appendChild(cellButton);
    })
  }
})();

const game = GameController;