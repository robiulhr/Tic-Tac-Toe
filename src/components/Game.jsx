import { useEffect, useState } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [nextMove, setNextMove] = useState(0);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [history, setHistory] = useState([]);
  const [timeTravelState, settimeTravelState] = useState(null);

  const makeMove = function (squareCount) {
    // set next move
    setNextMove(nextMove === 0 ? 1 : 0);
    // set square
    const changedElement = nextMove === 0 ? "O" : "X";
    const changedArr = [
      ...squares.slice(0, squareCount),
      changedElement,
      ...squares.slice(squareCount + 1),
    ];
    setSquares(changedArr);
    // reset timetravel state
    settimeTravelState(null);
    // set the history
    timeTravelState !== null && typeof timeTravelState == "number"
      ? setHistory([...history.slice(0, timeTravelState + 1), changedArr])
      : setHistory([...history, changedArr]);
  };

  const timeTravelHandler = (moveCount) => {
    moveCount < 0
      ? setSquares(new Array(9).fill(null))
      : setSquares(history[moveCount]);
    settimeTravelState(moveCount);
  };

  return (
    <div>
      <h1 className="game_title">Tic Tac Toe Game </h1>
      <div className="gameContents">
        <Board nextMove={nextMove} makeMove={makeMove} squares={squares} />
        <History timeTravelHandler={timeTravelHandler} history={history} />
      </div>
    </div>
  );
}

export default Game;
