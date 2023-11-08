import { useEffect } from "react";
import { giveRandomMove } from "../Utils/Utils";
import { getBoardContext, getTimerContext } from "../context/GameContext";
import { setTimer } from "../actions/GameActions";

function Timer({ makeMove }) {
  const { timer, dispatchTimer } = getTimerContext();
  const { timerValue, timerStatus, timerLength } = timer;
  const { board } = getBoardContext();
  const { squares } = board;
  useEffect(() => {
    let intervalId;
    if (timerValue !== null && timerStatus === "running" && timerValue < timerLength) {
      intervalId = setInterval(() => {
        const newTimerValue = timerValue + 1;
        setTimer(dispatchTimer, newTimerValue);
      }, 1000);
    } else if (timerValue >= timerLength) {
      setTimer(dispatchTimer, 0);
      let randomMove;
      randomMove = giveRandomMove(squares);
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
          <hr style={{ marginBottom: "20px" }} />
        </>
      )}
    </div>
  );
}

export default Timer;
