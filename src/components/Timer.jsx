import { useEffect } from "react";
import { getTimer, setTimer, startTimer, stopTimer, useTimerDispatch } from "../context/GameContexts/TimerContext";

function Timer() {
  const [timer, dispatchTimer] = [getTimer(), useTimerDispatch()];
  const { timerValue, timerStatus, timerEnabled } = timer;
  useEffect(() => {
    let intervalId;
    if (timerValue !== null && timerStatus === "running") {
      intervalId = setInterval(() => {
        const newTimerValue = timerValue + 1;
        setTimer(dispatchTimer, newTimerValue);
      }, 1000);
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
