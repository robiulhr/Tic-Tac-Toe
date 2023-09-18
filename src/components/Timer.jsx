import { useEffect } from "react";
import { getTimer, setTimer, startTimer, stopTimer, useTimerDispatch } from "../context/GameContexts/TimerContext";
import { getNextMove, setNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { giveRandomMove } from "../Utils/Utils";
import { getSquares } from "../context/GameContexts/GameSquareContext";

function Timer({ makeMove }) {
  const [timer, dispatchTimer] = [getTimer(), useTimerDispatch()];
  const { timerValue, timerStatus, timerEnabled, timerLength } = timer;
  const [nextMove, dispatchNextMove] = [getNextMove(), useNextMoveDispatch()];
  const squares = getSquares();
  useEffect(() => {
    let intervalId;
    if (timerValue !== null && timerStatus === "running" && timerValue < timerLength) {
      intervalId = setInterval(() => {
        const newTimerValue = timerValue + 1;
        setTimer(dispatchTimer, newTimerValue);
      }, 1000);
    } else if (timerValue >= timerLength) {
      setTimer(dispatchTimer, 0);
      const randomMove = giveRandomMove(squares);
      console.log(randomMove)
      makeMove(randomMove);
    }
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [timerStatus, timerValue]);

  return (
    <div>
      {timerStatus === "stoped" && (
        <button
          onClick={() => {
            startTimer(dispatchTimer);
          }}
        >
          Start Timer
        </button>
      )}

      {timerStatus === "running" && (
        <>
          <button
            onClick={() => {
              stopTimer(dispatchTimer);
            }}
          >
            Stop Timer
          </button>
          <div>{`${timerValue} second`}</div>
        </>
      )}
    </div>
  );
}

export default Timer;
