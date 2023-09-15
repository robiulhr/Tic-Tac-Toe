import { useContext, useState, createContext, useReducer } from "react";

const PlayerMoveContext = createContext(null);
const PlayerMoveDispatchContext = createContext(null);
const initialMove = 0;
const moveReducer = (nextMove,action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const {type, currentMove} = action
  switch (type) {
    case 'next':
      return currentMove === 0 ? 1 : 0;
    case 'reset':
      return 0;
    default:
      throw Error("Unknown action: " + type);
  }
};

export default function PlayerMoveProvider({ children }) {
  const [nextMove, dispatchNextMove] = useReducer(moveReducer, initialMove);
  return (
    <PlayerMoveContext.Provider value={nextMove}>
      <PlayerMoveDispatchContext.Provider value={dispatchNextMove}>
        {children}
      </PlayerMoveDispatchContext.Provider>
    </PlayerMoveContext.Provider>
  );
}

export function useMoveContext() {
  return useContext(PlayerMoveContext);
}

export function useDispatchNextMove() {
  return useContext(PlayerMoveDispatchContext);
}
