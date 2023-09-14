import { useEffect } from "react";
import {
  useTimerContext,
  useTimerDispatchContext,
} from "../context/GameContexts/TimerContext";

function Timer() {
  const [timer, dispatchTimer] = [useTimerContext(), useTimerDispatchContext()];
  const { timerValue, timerStatus, timerEnabled } = timer;
  useEffect(() => {
    let intervalId;
    if (timerValue !== null && timerStatus === "running") {
      intervalId = setInterval(() => {
        const newTimerValue = timerValue + 1;
        dispatchTimer({
          type: "setValue",
          timerValue: newTimerValue,
        });
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
            dispatchTimer({
              type: "start",
            });
          }}
        >
          Start Timer
        </button>
      )}

      {timerStatus === "running" && (
        <>
          <button
            onClick={() => {
              dispatchTimer({ type: "stop" });
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
