import { useEffect } from "react";
import { getNextMove, setNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { useSquareDispatch, getSquares, setSquares } from "../context/GameContexts/GameSquareContext";
import { getTimeTravelState, setTimeTravelState, useTimeTravelStateDispatch } from "../context/GameContexts/TimeTravelContext";
import { addHistories, getHistories, useHistoriesDispatch } from "../context/GameContexts/HistoryContext";
import { getWinner, setWinner, useWinnerDispatch } from "../context/GameContexts/WinnerContext";
import checkWinner from "../Utils/Utils";

function Square({ squareIndex }) {
  const [squares, dispatchSquares] = [getSquares(), useSquareDispatch()];
  const [nextMove, dispatchNextMove] = [getNextMove(), useNextMoveDispatch()];
  const [histories, dispatchHistories] = [getHistories(), useHistoriesDispatch()];
  const [timeTravelState, timeTravelStateDispatch] = [getTimeTravelState(), useTimeTravelStateDispatch()];
  const [winner, dispatchWinner] = [getWinner(), useWinnerDispatch()];

  const makeMove = function (squareIndex) {
    if (!squares[squareIndex] && !winner) {
      // set next move
      setNextMove(dispatchNextMove, nextMove);
      // set squares
      const upDatedSquares = setSquares(dispatchSquares, nextMove, squareIndex, squares);
      // reset timetravel state
      setTimeTravelState(timeTravelStateDispatch, null);
      // set the history
      const newHistoryObj = {
        squares: upDatedSquares,
        nextMove,
      };
      addHistories(dispatchHistories, newHistoryObj, timeTravelState);
    }
  };
  useEffect(() => {
    // check if any winner found
    const gotWinner = checkWinner(squares);
    const foundedWinner = !nextMove == 0 ? "O" : "X"
    if (gotWinner) setWinner(dispatchWinner, foundedWinner);
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
      isLastMove && setWinner(dispatchWinner,"Draw");
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
