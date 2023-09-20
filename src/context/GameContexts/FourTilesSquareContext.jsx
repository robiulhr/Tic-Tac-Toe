import { useContext, createContext, useReducer } from "react";

const FourTilesSquareContext = createContext(null);
const FourTilesSquareDispatchContext = createContext(null);

const initialSquares = new Array(16).fill(null);
const FourTilesSquaresReducer = (squares, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, nextMove, squareIndex, historySqures } = action;
  switch (type) {
    case "reset":
      return new Array(16).fill(null);
    case "set":
      const changedElement = nextMove === 0 ? "O" : "X";
      return [...squares.slice(0, squareIndex), changedElement, ...squares.slice(squareIndex + 1)];
    case "timeTravel":
      return historySqures;
    default:
      throw Error("Unknown action: " + type);
  }
};

function FourTilesSquaresProvider({ children }) {
  const [fourTilessquares, dispatchFourTilesSquares] = useReducer(FourTilesSquaresReducer, initialSquares);
  return (
    <FourTilesSquareContext.Provider value={fourTilessquares}>
      <FourTilesSquareDispatchContext.Provider value={dispatchFourTilesSquares}>{children}</FourTilesSquareDispatchContext.Provider>
    </FourTilesSquareContext.Provider>
  );
}

const useFourTilesSquaresDispatch = () => {
  const dispatchFourTilesSquares = useContext(FourTilesSquareDispatchContext);
  if (dispatchFourTilesSquares === undefined) {
    throw new Error("useFourTilesSquaresDispatch must be used within a context Provider");
  }
  return dispatchFourTilesSquares;
};

const getFourTilesSquares = function () {
  return useContext(FourTilesSquareContext);
};

const setFourTilesSquares = function (dispatch, nextMove, squareIndex, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("setFourTilesSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "set", nextMove, squareIndex });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = FourTilesSquaresReducer(oldSquares, {
      type: "set",
      nextMove,
      squareIndex,
    });
  }
  return upDatedSquares;
};

const resetFourTilesSquares = function (dispatch, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("resetFourTilesSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "reset" });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = FourTilesSquaresReducer(oldSquares, {
      type: "reset",
    });
  }
  return upDatedSquares;
};

const setFourTilesSquaresForTimetravel = function (dispatch, historySqures, oldSquares) {
  if (typeof dispatch !== "function") throw new Error("setFourTilesSquaresForTimetravel function expect a dispatch function as the first argument.");
  dispatch({ type: "timeTravel", historySqures });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = FourTilesSquaresReducer(oldSquares, {
      type: "timeTravel",
      historySqures,
    });
  }
  return upDatedSquares;
};

export default FourTilesSquaresProvider;
export { useFourTilesSquaresDispatch, getFourTilesSquares, setFourTilesSquares, resetFourTilesSquares, setFourTilesSquaresForTimetravel };
