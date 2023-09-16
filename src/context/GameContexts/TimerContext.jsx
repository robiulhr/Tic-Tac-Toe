import { useContext, createContext, useReducer } from "react";

const TimerContext = createContext(null);
const TimerDispatchContext = createContext(null);

const initialTimer = {
  timerEnabled: true,
  timerStatus: "stoped",
  timerValue: 0,
};
const timerReducer = (timer, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  switch (action.type) {
    case "start":
      return { ...timer, timerStatus: "running" };
    case "pause":
      return { ...timer, timerStatus: "paused" };
    case "stop":
      return { ...timer, timerValue: 0, timerStatus: "stoped" };
    case "set":
      return { ...timer, timerValue: action.timerValue };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

function TimerProvider({ children }) {
  const [timer, dispatchTimer] = useReducer(timerReducer, initialTimer);
  return (
    <TimerContext.Provider value={timer}>
      <TimerDispatchContext.Provider value={dispatchTimer}>{children}</TimerDispatchContext.Provider>
    </TimerContext.Provider>
  );
}

function getTimer() {
  return useContext(TimerContext);
}

function useTimerDispatch() {
  const dispatchTimer = useContext(TimerDispatchContext);
  if (dispatchTimer === undefined) {
    throw new Error("useTimerDispatch must be used within a context Provider");
  }
  return dispatchTimer;
}

const startTimer = function (dispatch, oldTimer) {
  if (typeof dispatch !== "function") throw new Error("startTimer function expect a dispatch function as the first argument.");
  dispatch({ type: "start" });
  let upDatedTimer = "Old Timer not provided";
  if (oldTimer) {
    upDatedTimer = timerReducer(oldTimer, {
      type: "start",
    });
  }
  return upDatedTimer;
};

const pauseTimer = function (dispatch, oldTimer) {
  if (typeof dispatch !== "function") throw new Error("pauseTimer function expect a dispatch function as the first argument.");
  dispatch({ type: "pause" });
  let upDatedTimer = "Old Timer not provided";
  if (oldTimer) {
    upDatedTimer = timerReducer(oldTimer, {
      type: "pause",
    });
  }
  return upDatedTimer;
};

const stopTimer = function (dispatch, oldTimer) {
  if (typeof dispatch !== "function") throw new Error("stopTimer function expect a dispatch function as the first argument.");
  dispatch({ type: "stop" });
  let upDatedTimer = "Old Timer not provided";
  if (oldTimer) {
    upDatedTimer = timerReducer(oldTimer, {
      type: "stop",
    });
  }
  return upDatedTimer;
};

const setTimer = function (dispatch, newValue, oldTimer) {
  if (typeof dispatch !== "function") throw new Error("setTimer function expect a dispatch function as the first argument.");
  dispatch({ type: "set", timerValue: newValue });
  let upDatedTimer = "Old Timer not provided";
  if (oldTimer) {
    upDatedTimer = timerReducer(oldTimer, {
      type: "set",
      timerValue: newValue,
    });
  }
  return upDatedTimer;
};

export default TimerProvider;
export { useTimerDispatch, getTimer, startTimer, pauseTimer, stopTimer, setTimer };
