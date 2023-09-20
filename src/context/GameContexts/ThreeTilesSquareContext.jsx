import { useContext, createContext, useReducer } from "react";

const ThreeTilesSquareContext = createContext(null);
const ThreeTilesSquareDispatchContext = createContext(null);

const initialSquares = new Array(9).fill(null);
const threeTilesSquaresReducer = (squares, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, nextMove, squareIndex, historySqures } = action;
  switch (type) {
    case "reset":
      return new Array(9).fill(null);
    case "set":
      const changedElement = nextMove === 0 ? "O" : "X";
      return [...squares.slice(0, squareIndex), changedElement, ...squares.slice(squareIndex + 1)];
    case "timeTravel":
      return historySqures;
    default:
      throw Error("Unknown action: " + type);
  }
};

function ThreeTilesSquaresProvider({ children }) {
  const [threeTilessquares, dispatchThreeTilesSquares] = useReducer(threeTilesSquaresReducer, initialSquares);
  return (
    <ThreeTilesSquareContext.Provider value={threeTilessquares}>
      <ThreeTilesSquareDispatchContext.Provider value={dispatchThreeTilesSquares}>{children}</ThreeTilesSquareDispatchContext.Provider>
    </ThreeTilesSquareContext.Provider>
  );
}

const useThreeTilesSquaresDispatch = () => {
  const dispatchThreeTilesSquares = useContext(ThreeTilesSquareDispatchContext);
  if (dispatchThreeTilesSquares === undefined) {
    throw new Error("useThreeTilesSquaresDispatch must be used within a context Provider");
  }
  return dispatchThreeTilesSquares;
};

const getThreeTilesSquares = function () {
  return useContext(ThreeTilesSquareContext);
};

const setThreeTilesSquares = function (dispatch, nextMove, squareIndex, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("setThreeTilesSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "set", nextMove, squareIndex });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = threeTilesSquaresReducer(oldSquares, {
      type: "set",
      nextMove,
      squareIndex,
    });
  }
  return upDatedSquares;
};

const resetThreeTilesSquares = function (dispatch, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("resetThreeTilesSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "reset" });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = threeTilesSquaresReducer(oldSquares, {
      type: "reset",
    });
  }
  return upDatedSquares;
};

const setThreeTilesSquaresForTimetravel = function (dispatch, historySqures, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("setThreeTilesSquaresForTimetravel function expect a dispatch function as the first argument.");
  dispatch({ type: "timeTravel", historySqures });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = threeTilesSquaresReducer(oldSquares, {
      type: "timeTravel",
      historySqures,
    });
  }
  return upDatedSquares;
};

export default ThreeTilesSquaresProvider;
export { useThreeTilesSquaresDispatch, getThreeTilesSquares, setThreeTilesSquares, resetThreeTilesSquares, setThreeTilesSquaresForTimetravel };
