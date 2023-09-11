import { useEffect } from "react";
import checkWinner from "../Utils/Utils";

function Square({
  squares,
  squareCount,
  makeMove,
  winner,
  winnerHandler,
}) {
  const squareClickHandler = () => {
    if (!squares[squareCount] && !winner) {
      makeMove(squareCount)
      // check if any winner found
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
