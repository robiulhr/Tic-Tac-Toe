import { useEffect, useState } from "react";
import Board from "./Board";
import History from "./History";
import checkWinner from "../Utils/Utils";
import PlayAgain from "./PlayAgain";

function Game() {
  const [nextMove, setNextMove] = useState(0);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [history, setHistory] = useState([]);
  const [timeTravelState, settimeTravelState] = useState(null);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timerRunning, setTimerRunning] = useState("stoped");
  const [timerValue, setTimerValue] = useState(null);
  const [winner, setWinner] = useState();

  const timerHandler = function (state) {
    setTimerRunning(state);
  };

  const makeMove = function (squareCount) {
    if (!squares[squareCount] && !winner) {
      // set next move
      const changedMove = nextMove === 0 ? 1 : 0;
      setNextMove(changedMove);
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
      const historyObj = {
        square: changedArr,
        nextMove: changedMove,
      };
      timeTravelState !== null && typeof timeTravelState == "number"
        ? setHistory([...history.slice(0, timeTravelState + 1), historyObj])
        : setHistory([...history, historyObj]);
    }
  };

  const timeTravelHandler = (moveCount) => {
    if (moveCount < 0) {
      setSquares(new Array(9).fill(null));
      setNextMove(0);
    } else {
      setSquares(history[moveCount].square);
      setNextMove(history[moveCount].nextMove);
    }
    settimeTravelState(moveCount);
  };
  const playAgainHandler = function () {
    setNextMove(0);
    setSquares(new Array(9).fill(null));
    setHistory([]);
    settimeTravelState(null);
    setWinner();
  };

  useEffect(() => {
    // check if any winner found
    const gotWinner = checkWinner(squares);
    if (gotWinner) setWinner(!nextMove == 0 ? "O" : "X");
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
      isLastMove && setWinner("Draw");
    }
  });

  // handle timer
  useEffect(() => {
    if (timerRunning === "running") {
      setTimerValue(0);
    }
  }, [timerRunning]);

  useEffect(() => {
    let intervalId;
    if (timerValue !== null && timerRunning === "running") {
      intervalId = setInterval(() => {
        const newTimerValue = timerValue + 1;
        setTimerValue(newTimerValue);
      }, 1000);
    }
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [timerValue]);

  return (
    <div className="game_wrapper">
      <div className="title">
        <h1 className="game_title">Tic Tac Toe Game </h1>
      </div>
      <div className="gameContents_upper">
        <Board
          nextMove={nextMove}
          makeMove={makeMove}
          squares={squares}
          winner={winner}
          timerEnabled={timerEnabled}
          timerRunning={timerRunning}
          timerHandler={timerHandler}
          timerValue={timerValue}
        />
        {history.length > 0 && (
          <History timeTravelHandler={timeTravelHandler} history={history} />
        )}
      </div>
      <div className="gameContents_bottom">
        {winner && <PlayAgain playAgainHandler={playAgainHandler} />}
      </div>
    </div>
  );
}

export default Game;
