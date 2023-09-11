import { useEffect } from "react";
import checkWinner from "../Utils/Utils";

function Square({
  nextMoveHandler,
  timeTravelState,
  resetTimeTravelState,
  squares,
  squareCount,
  squareHandler,
  winner,
  history,
  winnerHandler,
  historyHandler,
  resetHistoryHandler,
  makeMove,
}) {
  const squareClickHandler = () => {
    if (!squares[squareCount] && !winner) {
      // console.log("history in square page start",history)
      nextMoveHandler();
      
      let traveling = false;

      if (typeof timeTravelState === "number" && timeTravelState !== null) {
        traveling = true;
      }
      
      makeMove(squareCount, traveling);

      const gotWinner = checkWinner(squares);
      if (gotWinner) winnerHandler(squares[squareCount]);
      else {
        // no winner found
        let isLastMove = true;
        for (let i = 0; i < squares.length; i++) {
          // if this is not the last move
          if (!squares[i]) {
            isLastMove = false;
            break;
          }
        }
        // check if the move is the last move but no winner found that means the result is draw
        isLastMove && winnerHandler("Draw");
      }
    }
  };
  return (
    <div className="square">
      <button onClick={squareClickHandler}>{squares[squareCount]}</button>
    </div>
  );
}

export default Square;
