const Gameboard = (function () {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = '0';
  }
  
  const getBoard = () => console.log(board);

  const makeMove = (cell, player) => {
    if (board[cell] == '0') {
        board[cell] = player
      }
  }


  return {getBoard, makeMove};
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
    board.getBoard();

    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (cell) => {
    console.log(`${getActivePlayer().name} marked the cell ${cell}...`);
    board.makeMove(cell, getActivePlayer().marker);
  
    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {playRound};
})();

const game = GameController;