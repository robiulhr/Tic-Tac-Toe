import { useEffect } from "react";
import Square from "./Square";
import Timer from "./Timer";
import { checkBoardWinner } from "../Utils/Utils";
import { getBoardContext, getHistoryContext, getTimerContext, getWinnerContext } from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { addHistories, setNextMove, setSquares, setTimeTravelState, setTimer, setWinner, stopTimer } from "../actions/GameActions";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Board({ firstRender, formDirtyHandler }) {
  const { playingSettings } = getPlayingSettingsContext();
  const { board, dispatchBoard } = getBoardContext();
  const { squares, nextMove } = board;
  const { history, dispatchHistory } = getHistoryContext();
  const { histories, timeTravelState } = history;
  const { winner, dispatchWinner } = getWinnerContext();
  const { timer, dispatchTimer } = getTimerContext();
  const { timerEnabled, timerStatus, timerValue } = timer;
  const winnerTitle = winner && winner !== "Draw" && `Winner : ${winner}`;
  const drawTitle = winner === "Draw" && `Result: Draw`;
  const nextMoveTitle = `Next Player Move: ${nextMove === 0 ? "O" : "X"}`;
  let squareRows;
  if (!playingSettings.tileCount) return <Navigate to="/" replace={true} />;
  switch (playingSettings.tileCount) {
    case 3:
      squareRows = new Array(3).fill(new Array(3).fill(null));
      break;
    case 4:
      squareRows = new Array(4).fill(new Array(4).fill(null));
      break;
    case 5:
      squareRows = new Array(5).fill(new Array(5).fill(null));
      break;
  }
  let squareIndex = 0;
  const makeMove = function (squareIndex) {
    if (!squares[squareIndex] && !winner && (timerEnabled ? timerStatus === "running" : timerStatus !== "running")) {
      // make dirty if it is the first move
      if (histories.length === 0) {
        formDirtyHandler(true);
      }
      // store the move before the nextmove gets updated
      const currentMove = nextMove;
      // set next move
      setNextMove(dispatchBoard, nextMove);
      // set squares
      const upDatedBoard = setSquares(dispatchBoard, squareIndex, currentMove, board);
      // reset timetravel state
      setTimeTravelState(dispatchHistory, null);
      // set the history
      const newHistoryObj = {
        squares: upDatedBoard.squares,
        currentMove,
      };
      if (timerEnabled) {
        newHistoryObj.moveTimeTaken = timerValue;
        setTimer(dispatchTimer, 0);
      }
      addHistories(dispatchHistory, newHistoryObj, timeTravelState, history);
    } else if (timer.timerEnabled && timer.timerStatus !== "running") {
      toast.error("please, start the timer.");
    } else if (winner) {
      toast.info("Game has been finished. please start again to play.");
    }
  };

  useEffect(() => {
    if (!firstRender) {
      // check if any winner found
      const gotWinner = checkBoardWinner(squares);
      const foundedWinner = nextMove === 0 ? "X" : "O";
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
    }
  }, [board]);

  useEffect(() => {
    if (winner) {
      toast.success(winner === "O" || winner === "X" ? `'${winner}'` + " has won the match" : "Match draw.");
      stopTimer(dispatchTimer);
      formDirtyHandler(false);
    }
  }, [winner]);

  return (
    <div className="board">
      <div>
        {winnerTitle && <h3>{winnerTitle}</h3>}
        {drawTitle && <h3>{drawTitle}</h3>}
        {nextMoveTitle && !winnerTitle && !drawTitle && <h3> {nextMoveTitle}</h3>}
      </div>
      <hr style={{ marginBottom: "20px" }} />
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
