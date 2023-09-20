
function checkThreeTilesBoardWinner(squares) {
  let winner;
  const list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < list.length; i++) {
    const listElement = list[i];
    if (
      squares[listElement[0]] &&
      squares[listElement[0]] === squares[listElement[1]] &&
      squares[listElement[1]] === squares[listElement[2]]
    ) {
      winner = squares[listElement[0]];
      break;
    }
  }
  return winner;
}

function checkFourTilesBoardWinner(squares) {
  let winner;
  const list = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  for (let i = 0; i < list.length; i++) {
    const listElement = list[i];
    if (
      squares[listElement[0]] &&
      squares[listElement[0]] === squares[listElement[1]] &&
      squares[listElement[1]] === squares[listElement[2]] &&
      squares[listElement[2]] === squares[listElement[3]]
    ) {
      winner = squares[listElement[0]];
      break;
    }
  }
  return winner;
}


function checkFiveTilesBoardWinner(squares) {
  let winner;
  const list = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  for (let i = 0; i < list.length; i++) {
    const listElement = list[i];
    if (
      squares[listElement[0]] &&
      squares[listElement[0]] === squares[listElement[1]] &&
      squares[listElement[1]] === squares[listElement[2]] &&
      squares[listElement[2]] === squares[listElement[3]] &&
      squares[listElement[3]] === squares[listElement[4]]
    ) {
      winner = squares[listElement[0]];
      break;
    }
  }
  return winner;
}

const giveRandomMove = function (squares) {
  const length = (squares.length) - 1;
  let randomMove = Math.round(length * Math.random())
  if (squares[randomMove] !== null) randomMove = giveRandomMove(squares);
  return randomMove;
}

export { checkThreeTilesBoardWinner, checkFourTilesBoardWinner, checkFiveTilesBoardWinner, giveRandomMove }