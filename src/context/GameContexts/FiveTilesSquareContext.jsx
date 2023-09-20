import { useContext, createContext, useReducer } from "react";

const FiveTilesSquareContext = createContext(null);
const FiveTilesSquareDispatchContext = createContext(null);

const initialSquares = new Array(25).fill(null);
const FiveTilesSquaresReducer = (squares, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, nextMove, squareIndex, historySqures } = action;
  switch (type) {
    case "reset":
      return new Array(25).fill(null);
    case "set":
      const changedElement = nextMove === 0 ? "O" : "X";
      return [...squares.slice(0, squareIndex), changedElement, ...squares.slice(squareIndex + 1)];
    case "timeTravel":
      return historySqures;
    default:
      throw Error("Unknown action: " + type);
  }
};

function FiveTilesSquaresProvider({ children }) {
  const [fiveTilessquares, dispatchFiveTilesSquares] = useReducer(FiveTilesSquaresReducer, initialSquares);
  return (
    <FiveTilesSquareContext.Provider value={fiveTilessquares}>
      <FiveTilesSquareDispatchContext.Provider value={dispatchFiveTilesSquares}>{children}</FiveTilesSquareDispatchContext.Provider>
    </FiveTilesSquareContext.Provider>
  );
}

const useFiveTilesSquaresDispatch = () => {
  const dispatchFiveTilesSquares = useContext(FiveTilesSquareDispatchContext);
  if (dispatchFiveTilesSquares === undefined) {
    throw new Error("useFiveTilesSquaresDispatch must be used within a context Provider");
  }
  return dispatchFiveTilesSquares;
};

const getFiveTilesSquares = function () {
  return useContext(FiveTilesSquareContext);
};

const setFiveTilesSquares = function (dispatch, nextMove, squareIndex, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("setFiveTilesSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "set", nextMove, squareIndex });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = FiveTilesSquaresReducer(oldSquares, {
      type: "set",
      nextMove,
      squareIndex,
    });
  }
  return upDatedSquares;
};

const resetFiveTilesSquares = function (dispatch, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("resetFiveTilesSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "reset" });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = FiveTilesSquaresReducer(oldSquares, {
      type: "reset",
    });
  }
  return upDatedSquares;
};

const setFiveTilesSquaresForTimetravel = function (dispatch, historySqures, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("setFiveTilesSquaresForTimetravel function expect a dispatch function as the first argument.");
  dispatch({ type: "timeTravel", historySqures });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = FiveTilesSquaresReducer(oldSquares, {
      type: "timeTravel",
      historySqures,
    });
  }
  return upDatedSquares;
};

export default FiveTilesSquaresProvider;
export { useFiveTilesSquaresDispatch, getFiveTilesSquares, setFiveTilesSquares, resetFiveTilesSquares, setFiveTilesSquaresForTimetravel };
