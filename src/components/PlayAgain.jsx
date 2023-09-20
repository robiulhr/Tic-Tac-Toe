import { resetNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { resetThreeTilesSquares, useThreeTilesSquaresDispatch } from "../context/GameContexts/ThreeTilesSquareContext";
import { resetFourTilesSquares, useFourTilesSquaresDispatch } from "../context/GameContexts/FourTilesSquareContext";
import { resetFiveTilesSquares, useFiveTilesSquaresDispatch } from "../context/GameContexts/FiveTilesSquareContext";
import { eraseHistories, useHistoriesDispatch } from "../context/GameContexts/HistoryContext";
import { setTimeTravelState, useTimeTravelStateDispatch } from "../context/GameContexts/TimeTravelContext";
import { resetWinner, useWinnerDispatch } from "../context/GameContexts/WinnerContext";
import { useTimerDispatch, startTimer, getTimer } from "../context/GameContexts/TimerContext";
import { getPlayingSettings } from "../context/PlaySettingsContext";

function PlayAgain() {
  const playingSettings = getPlayingSettings();
  const dispatchNextMove = useNextMoveDispatch();
  const dispatchHistories = useHistoriesDispatch();
  const dispatchThreeTilesSquares = useThreeTilesSquaresDispatch();
  const dispatchFourTilesSquares = useFourTilesSquaresDispatch();
  const dispatchFiveTilesSquares = useFiveTilesSquaresDispatch();
  const dispatchTimeTravelState = useTimeTravelStateDispatch();
  const dispatchWinner = useWinnerDispatch();
  const dispatchTimer = useTimerDispatch();
  const timer = getTimer();
  const playAgainHandler = function () {
    resetNextMove(dispatchNextMove);
    playingSettings.tileCount === 3 && resetThreeTilesSquares(dispatchThreeTilesSquares);
    playingSettings.tileCount === 4 && resetFourTilesSquares(dispatchFourTilesSquares);
    playingSettings.tileCount === 5 && resetFiveTilesSquares(dispatchFiveTilesSquares);
    eraseHistories(dispatchHistories);
    setTimeTravelState(dispatchTimeTravelState, null);
    resetWinner(dispatchWinner);
    if (timer.timerEnabled) startTimer(dispatchTimer);
  };
  return (
    <div>
      <button onClick={playAgainHandler}>Play again</button>
    </div>
  );
}

export default PlayAgain;
