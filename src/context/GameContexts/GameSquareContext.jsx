import { useContext, createContext, useReducer } from "react";

const GameSquaresContext = createContext(null);
const GameSquaresDispatchContext = createContext(null);

const initialSquares = new Array(9).fill(null);
const squaresReducer = (squares, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, nextMove, squareIndex } = action;
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
    default:
      throw Error("Unknown action: " + type);
  }
};

export default function SquaresProvider({ children }) {
  const [squares, dispatchSquares] = useReducer(squaresReducer, initialSquares);
  return (
    <GameSquaresContext.Provider value={squares}>
      <GameSquaresDispatchContext.Provider value={dispatchSquares}>
        {children}
      </GameSquaresDispatchContext.Provider>
    </GameSquaresContext.Provider>
  );
}

export function useGameSquaresContext() {
  return useContext(GameSquaresContext);
}

export function useGameSquaresDispatchContext() {
  return useContext(GameSquaresDispatchContext);
}
