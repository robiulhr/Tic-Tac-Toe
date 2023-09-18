import { useContext, useState, createContext, useReducer } from "react";

const TimeTravelContext = createContext(null);
const TimeTravelStateDispatchContext = createContext(null);

function timeTravelStateReducer(timeTravelState, action) {
  if (action.type === "set") return action.timeTravelState;
}

function TimeTravelProvider({ children }) {
  const [timeTravelState, timeTravelStateDispatch] = useReducer(timeTravelStateReducer, null);
  return (
    <TimeTravelContext.Provider value={timeTravelState}>
      <TimeTravelStateDispatchContext.Provider value={timeTravelStateDispatch}>{children}</TimeTravelStateDispatchContext.Provider>
    </TimeTravelContext.Provider>
  );
}

function useTimeTravelStateDispatch() {
  const dispatchTimeTravel = useContext(TimeTravelStateDispatchContext);
  if (dispatchTimeTravel === undefined) {
    throw new Error("useTimeTravelStateDispatch must be used within a context Provider");
  }
  return dispatchTimeTravel;
}

function getTimeTravelState() {
  return useContext(TimeTravelContext);
}

function setTimeTravelState(dispatch, timeTravelState, oldTimeTravelState) {
  if (typeof dispatch !== "function") throw new Error("setTimeTravelState function expect a dispatch function as the first argument.");
  dispatch({ type: "set", timeTravelState });
  let upDatedTimeTravelState = "Old Time Travel State not provided";
  if (oldTimeTravelState) {
    upDatedTimeTravelState = timeTravelStateReducer(oldTimeTravelState, {
      type: "set",
      timeTravelState,
    });
  }
  return upDatedTimeTravelState;
}

export default TimeTravelProvider;
export { getTimeTravelState, useTimeTravelStateDispatch, setTimeTravelState };
