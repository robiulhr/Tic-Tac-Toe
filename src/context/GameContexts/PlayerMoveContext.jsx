import { useContext, useState, createContext, useReducer } from "react";

const PlayerMoveContext = createContext(null);
const PlayerMoveDispatchContext = createContext(null);
const initialMove = 0;
const moveReducer = (currentMove) => {
  return currentMove === 0 ? 1 : 0;
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
