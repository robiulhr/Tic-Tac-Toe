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
    case "setValue":
      return { ...timer, timerValue: action.timerValue };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export default function TimerProvider({ children }) {
  const [timer, dispatchTimer] = useReducer(timerReducer, initialTimer);
  console.log(timer)
  return (
    <TimerContext.Provider value={timer}>
      <TimerDispatchContext.Provider value={dispatchTimer}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  return useContext(TimerContext);
}

export function useTimerDispatchContext() {
  return useContext(TimerDispatchContext);
}
