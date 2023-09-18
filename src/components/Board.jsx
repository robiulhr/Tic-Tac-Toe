import { useEffect } from "react";
import Square from "./Square";
import Timer from "./Timer";
import { getNextMove, setNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { useSquareDispatch, getSquares, setSquares } from "../context/GameContexts/GameSquareContext";
import { getTimeTravelState, setTimeTravelState, useTimeTravelStateDispatch } from "../context/GameContexts/TimeTravelContext";
import { addHistories, getHistories, useHistoriesDispatch } from "../context/GameContexts/HistoryContext";
import { getWinner, setWinner, useWinnerDispatch } from "../context/GameContexts/WinnerContext";
import { checkWinner } from "../Utils/Utils";
import { getTimer, setTimer, useTimerDispatch, stopTimer } from "../context/GameContexts/TimerContext";

function Board() {
  const [squares, dispatchSquares] = [getSquares(), useSquareDispatch()];
  const [nextMove, dispatchNextMove] = [getNextMove(), useNextMoveDispatch()];
  const [histories, dispatchHistories] = [getHistories(), useHistoriesDispatch()];
  const [timeTravelState, timeTravelStateDispatch] = [getTimeTravelState(), useTimeTravelStateDispatch()];
  const [winner, dispatchWinner] = [getWinner(), useWinnerDispatch()];
  const [timer, dispatchTimer] = [getTimer(), useTimerDispatch()];
  const winnerTitle = winner && winner !== "Draw" && `Winner : ${winner}`;
  const drawTitle = winner === "Draw" && `Result: Draw`;
  const nextMoveTitle = `Next Player Move: ${nextMove ? "X" : "O"}`;
  const squareRows = new Array(3).fill(new Array(3).fill(null));
  let squareIndex = 0;

  const makeMove = function (squareIndex) {
    if (!squares[squareIndex] && !winner && (timer.timerEnabled ? timer.timerStatus === "running" : timer.timerStatus !== "running")) {
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
      if (timer.timerEnabled) {
        newHistoryObj.moveTimeTaken = timer.timerValue;
        setTimer(dispatchTimer, 0);
      }
      addHistories(dispatchHistories, newHistoryObj, timeTravelState, histories);
    } else if (timer.timerEnabled && timer.timerStatus !== "running") {
      console.log("please, start the timer.");
    } else if (winner) {
      console.log("Game has been finished. please start again to play.");
    }
  };
  useEffect(() => {
    // check if any winner found
    const gotWinner = checkWinner(squares);
    const foundedWinner = !nextMove == 0 ? "O" : "X";
    if (gotWinner) {
      setWinner(dispatchWinner, foundedWinner);
    } else {
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
      isLastMove && setWinner(dispatchWinner, "Draw");
    }
  });

  useEffect(() => {
    if (winner) {
      stopTimer(dispatchTimer);
    }
  }, [winner]);

  return (
    <div className="board">
      <div>
        {winnerTitle && <h3>{winnerTitle}</h3>}
        {drawTitle && <h3>{drawTitle}</h3>}
        {nextMoveTitle && !winnerTitle && !drawTitle && <h3> {nextMoveTitle}</h3>}
      </div>
      <hr style={{ "margin-bottom": "20px" }} />
      {timer.timerEnabled && <Timer makeMove={makeMove} />}
      {squareRows.map((ele, ind) => {
        return (
          <div key={ind} className="row">
            {ele.map((element, index) => {
              const squareElement = <Square key={squareIndex} makeMove={makeMove} squareIndex={squareIndex} />;
              squareIndex++;
              return squareElement;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
