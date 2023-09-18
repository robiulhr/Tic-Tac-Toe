
function checkWinner(squares) {
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

const giveRandomMove = function (squares) {
  const length = (squares.length)-1;
  let randomMove = Math.round(length * Math.random())
  if (squares[randomMove] !== null) randomMove = giveRandomMove(squares);
  return randomMove;
}

export { checkWinner, giveRandomMove }