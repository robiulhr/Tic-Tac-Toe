import { useContext, useState, createContext, useReducer } from "react";

const PlayerMoveContext = createContext(null);
const PlayerMoveDispatchContext = createContext(null);
const initialMove = 0;

const moveReducer = (nextMove, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, currentMove } = action;
  switch (type) {
    case "next":
      return currentMove === 0 ? 1 : 0;
    case "reset":
      return 0;
    default:
      throw Error("Unknown action: " + type);
  }
};

function PlayerMoveProvider({ children }) {
  const [nextMove, dispatchNextMove] = useReducer(moveReducer, initialMove);
  return (
    <PlayerMoveContext.Provider value={nextMove}>
      <PlayerMoveDispatchContext.Provider value={dispatchNextMove}>
        {children}
      </PlayerMoveDispatchContext.Provider>
    </PlayerMoveContext.Provider>
  );
}

function getNextMove() {
  return useContext(PlayerMoveContext);
}

function useNextMoveDispatch() {
  const dispatchNextMove = useContext(PlayerMoveDispatchContext);
  if (dispatchNextMove === undefined) {
    throw new Error(
      "useNextMoveDispatch must be used within a context Provider"
    );
  }
  return dispatchNextMove;
}

function setNextMove(dispatch, currentMove, oldMove) {
  if (typeof dispatch !== "function")
    throw new Error(
      "setNextMove function expect a dispatch function as the first argument."
    );
  dispatch({ type: "next", currentMove});
  let upDatedMove = "old Move not provided";
  if (oldMove) {
    upDatedMove = moveReducer(oldMove, {
      type: "next",
      currentMove
    });
  }
  return upDatedMove;
}

function resetNextMove(dispatch, oldMove) {
  if (typeof dispatch !== "function")
    throw new Error(
      "resetNextMove function expect a dispatch function as the first argument."
    );
  dispatch({ type: "reset"});
  let upDatedMove = "old Move not provided";
  if (oldMove) {
    upDatedMove = moveReducer(oldMove, {
      type: "reset",
    });
  }
  return upDatedMove;
}

export default PlayerMoveProvider
export { useNextMoveDispatch, getNextMove,setNextMove,resetNextMove };
