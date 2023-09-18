import { resetNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { resetSquares, useSquareDispatch } from "../context/GameContexts/GameSquareContext";
import { eraseHistories, useHistoriesDispatch } from "../context/GameContexts/HistoryContext";
import { setTimeTravelState, useTimeTravelStateDispatch } from "../context/GameContexts/TimeTravelContext";
import { resetWinner, useWinnerDispatch } from "../context/GameContexts/WinnerContext";
import { useTimerDispatch,startTimer } from "../context/GameContexts/TimerContext";

function PlayAgain() {
  const dispatchNextMove = useNextMoveDispatch();
  const dispatchHistories = useHistoriesDispatch();
  const dispatchSquares = useSquareDispatch();
  const dispatchTimeTravelState = useTimeTravelStateDispatch();
  const dispatchWinner = useWinnerDispatch();
  const dispatchTimer = useTimerDispatch();
  const playAgainHandler = function () {
    resetNextMove(dispatchNextMove);
    resetSquares(dispatchSquares);
    eraseHistories(dispatchHistories);
    setTimeTravelState(dispatchTimeTravelState, null);
    resetWinner(dispatchWinner);
    startTimer(dispatchTimer);
  };
  return (
    <div>
      <button onClick={playAgainHandler}>Play again</button>
    </div>
  );
}

export default PlayAgain;
