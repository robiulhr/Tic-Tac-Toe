import { useContext, createContext, useReducer } from "react";

const GameSquaresContext = createContext(null);
const GameSquaresDispatchContext = createContext(null);

const initialSquares = new Array(9).fill(null);
const squaresReducer = (squares, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, nextMove, squareIndex, historySqures } = action;
  switch (type) {
    case "reset":
      return new Array(9).fill(null);
    case "set":
      const changedElement = nextMove === 0 ? "O" : "X";
      return [
        ...squares.slice(0, squareIndex),
        changedElement,
        ...squares.slice(squareIndex + 1),
      ];
    case "timeTravel":
      return historySqures;
    default:
      throw Error("Unknown action: " + type);
  }
};

function SquaresProvider({ children }) {
  const [squares, dispatchSquares] = useReducer(squaresReducer, initialSquares);
  return (
    <GameSquaresContext.Provider value={squares}>
      <GameSquaresDispatchContext.Provider value={dispatchSquares}>
        {children}
      </GameSquaresDispatchContext.Provider>
    </GameSquaresContext.Provider>
  );
}

const useSquareDispatch = () => {
  const dispatchSquares = useContext(GameSquaresDispatchContext);
  if (dispatchSquares === undefined) {
    throw new Error("useSquareDispatch must be used within a context Provider");
  }
  return dispatchSquares;
};

const getSquares = function () {
  return useContext(GameSquaresContext);
};

const setSquares = function (dispatch,nextMove, squareIndex, oldSquares) {
  if(typeof dispatch !== 'function') throw new Error("setSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "set", nextMove, squareIndex });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = squaresReducer(oldSquares, {
      type: "set",
      nextMove,
      squareIndex,
    });
  }
  return upDatedSquares;
};

const resetSquares = function (dispatch,oldSquares) {
  if(typeof dispatch !== 'function') throw new Error("resetSquares function expect a dispatch function as the first argument.");
  dispatch({ type: "reset" });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = squaresReducer(oldSquares, {
      type: "reset",
    });
  }
  return upDatedSquares;
};

const setSquaresForTimetravel = function (dispatch,historySqures, oldSquares) {
  if(typeof dispatch !== 'function') throw new Error("setSquaresForTimetravel function expect a dispatch function as the first argument.");
  dispatch({ type: "timeTravel", historySqures });
  let upDatedSquares = "Old Square not provided";
  if (oldSquares) {
    upDatedSquares = squaresReducer(oldSquares, {
      type: "timeTravel",
      historySqures,
    });
  }
  return upDatedSquares;
};

export default SquaresProvider;
export {
  useSquareDispatch,
  getSquares,
  setSquares,
  resetSquares,
  setSquaresForTimetravel,
};
