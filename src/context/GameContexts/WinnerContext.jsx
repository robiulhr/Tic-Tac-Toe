import { useContext, createContext, useReducer } from "react";

const WinnerContext = createContext(null);
const WinnerDispatchContext = createContext(null);

function winnerReducer(winnerState, action) {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, winner } = action;
  switch (type) {
    case "set":
      return winner;
    case "reset":
      return null;
    default:
      throw Error("Unknown action: " + type);
  }
}

function WinnerProvider({ children }) {
  const [winner, dispatchWinner] = useReducer(winnerReducer, null);
  return (
    <WinnerContext.Provider value={winner}>
      <WinnerDispatchContext.Provider value={dispatchWinner}>{children}</WinnerDispatchContext.Provider>
    </WinnerContext.Provider>
  );
}

function useWinnerDispatch() {
  const dispatchWinner = useContext(WinnerDispatchContext);
  if (dispatchWinner === undefined) {
    throw new Error("useWinnerDispatch must be used within a context Provider");
  }
  return dispatchWinner;
}

function getWinner() {
  return useContext(WinnerContext);
}

function setWinner(dispatch, winner, oldWinnerState) {
  if (typeof dispatch !== "function") throw new Error("setWinner function expect a dispatch function as the first argument.");
  dispatch({ type: "set", winner });
  let upDatedWinner = "Old winner State not provided";
  if (oldWinnerState) {
    upDatedWinner = timeTravelStateReducer(oldWinnerState, {
      type: "set",
      oldWinnerState,
    });
  }
  return upDatedWinner;
}

function resetWinner(dispatch, oldWinnerState) {
  if (typeof dispatch !== "function") throw new Error("resetWinner function expect a dispatch function as the first argument.");
  dispatch({ type: "reset" });
  let upDatedWinner = "Old Winner State not provided";
  if (oldWinnerState) {
    upDatedWinner = timeTravelStateReducer(oldWinnerState, {
      type: "set",
    });
  }
  return upDatedWinner;
}

export default WinnerProvider;
export { getWinner, useWinnerDispatch, setWinner, resetWinner };
