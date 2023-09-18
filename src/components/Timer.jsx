import { useEffect } from "react";
import { getTimer, setTimer, startTimer, stopTimer, useTimerDispatch } from "../context/GameContexts/TimerContext";
import { getNextMove, setNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { giveRandomMove } from "../Utils/Utils";
import { getSquares } from "../context/GameContexts/GameSquareContext";

function Timer({ makeMove }) {
  const [timer, dispatchTimer] = [getTimer(), useTimerDispatch()];
  const { timerValue, timerStatus, timerEnabled, timerLength } = timer;
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
      makeMove(randomMove);
    }
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [timerStatus, timerValue]);

  return (
    <div>
      {timerStatus === "running" && (
        <>
          <h4>Timer</h4>
          <div>{`${timerValue} second`}</div>
          <hr style={{'margin-bottom':'20px'}} />
        </>
      )}
    </div>
  );
}

export default Timer;
