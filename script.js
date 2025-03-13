const Gameboard = (function () {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = '0';
  }
  
  const getBoard = () => console.log(board);

  const makeMove = (cell, player) => {
    if (board[cell] == '0') {
        board[cell] = player.marker
      }
  }


  return {getBoard, makeMove};
})();