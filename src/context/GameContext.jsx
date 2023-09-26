import { useContext, createContext, useReducer } from "react";
import { boardReducer, historyReducer, timerReducer, winnerReducer } from "../reducer/GameReducer";
import { initialBoard, initailHistory, initialTimer, initialWinner } from "../initialValue/GameInitialValues";
const BoardContext = createContext(null);
const HistoryContext = createContext(null);
const TimerContext = createContext(null);
const WinnerContext = createContext(null);

function GameProvider({ children }) {
  const [board, dispatchBoard] = useReducer(boardReducer, initialBoard);
  const [history, dispatchHistory] = useReducer(historyReducer, initailHistory);
  const [timer, dispatchTimer] = useReducer(timerReducer, initialTimer);
  const [winner, dispatchWinner] = useReducer(winnerReducer, initialWinner);
  return (
    <BoardContext.Provider value={{ board, dispatchBoard }}>
      <HistoryContext.Provider value={{ history, dispatchHistory }}>
        <TimerContext.Provider value={{ timer, dispatchTimer }}>
          <WinnerContext.Provider value={{ winner, dispatchWinner }}>{children}</WinnerContext.Provider>
        </TimerContext.Provider>
      </HistoryContext.Provider>
    </BoardContext.Provider>
  );
}

// get context functions
function getBoardContext() {
  const { board, dispatchBoard } = useContext(BoardContext);
  if (board === undefined || dispatchBoard === undefined) throw new Error("getBoardContext must be used within a context Provider");
  return {board, dispatchBoard};
}

function getHistoryContext() {
  const { history, dispatchHistory } = useContext(HistoryContext);
  if (history === undefined || dispatchHistory === undefined) throw new Error("getHistoryContext must be used within a context Provider");
  return {history, dispatchHistory};
}

function getTimerContext() {
  const { timer, dispatchTimer } = useContext(TimerContext);
  if (history === undefined || dispatchTimer === undefined) throw new Error("getTimerContext must be used within a context Provider");
  return {timer, dispatchTimer};
}

function getWinnerContext() {
  const { winner, dispatchWinner } = useContext(WinnerContext);
  if (history === undefined || dispatchWinner === undefined) throw new Error("getWinnerContext must be used within a context Provider");
  return {winner, dispatchWinner};
}

export default GameProvider;
export { getBoardContext, getHistoryContext, getTimerContext, getWinnerContext };
