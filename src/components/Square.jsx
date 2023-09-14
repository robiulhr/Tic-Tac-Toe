import { useEffect } from "react";
import {
  useMoveContext,
  useDispatchNextMove,
} from "../context/GameContexts/PlayerMoveContext";
import {
  useGameSquaresContext,
  useGameSquaresDispatchContext,
} from "../context/GameContexts/GameSquareContext";
import {
  useTimeTravelContext,
  useTimeTravelStateDispatchContext,
} from "../context/GameContexts/TimeTravelContext";
import { useHistoriesDispatchContext } from "../context/GameContexts/HistoryContext";
import {
  useWinnerContext,
  useWinnerDispatchContext,
} from "../context/GameContexts/WinnerContext";
import checkWinner from "../Utils/Utils";

function Square({ squareIndex }) {
  const [nextMove, dispatchNextMove] = [
    useMoveContext(),
    useDispatchNextMove(),
  ];
  const [squares, dispatchSquares] = [
    useGameSquaresContext(),
    useGameSquaresDispatchContext(),
  ];
  const [dispatchHistories] = [useHistoriesDispatchContext()];
  const [timeTravelState, dispatchtimeTravelState] = [
    useTimeTravelContext(),
    useTimeTravelStateDispatchContext(),
  ];
  const [winner, dispatchWinner] = [
    useWinnerContext(),
    useWinnerDispatchContext(),
  ];

  const makeMove = function (squareIndex) {
    if (!squares[squareIndex] && !winner) {
      // set next move
      dispatchNextMove();
      // dispatch square
      dispatchSquares({ type: "set", nextMove, squareIndex });
      // reset timetravel state
      dispatchtimeTravelState(null);
      // set the history
      const newHistoryObj = {
        squares,
        nextMove,
      };
      dispatchHistories({ type:"add",newHistoryObj, timeTravelState });
    }
  };
  useEffect(() => {
    // check if any winner found
    const gotWinner = checkWinner(squares);
    if (gotWinner) dispatchWinner(!nextMove == 0 ? "O" : "X");
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
      isLastMove && dispatchWinner("Draw");
    }
  });
  return (
    <div className="square">
      <button
        onClick={() => {
          makeMove(squareIndex);
        }}
      >
        {squares[squareIndex]}
      </button>
    </div>
  );
}

export default Square;
