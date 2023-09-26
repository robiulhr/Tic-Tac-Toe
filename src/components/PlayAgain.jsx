import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { getBoardContext, getHistoryContext, getTimerContext, getWinnerContext } from "../context/GameContext";
import { eraseHistories, resetBoard, resetWinner, setTimeTravelState, startTimer } from "../actions/GameActions";

function PlayAgain() {
  const { dispatchBoard } = getBoardContext();
  const { dispatchHistory } = getHistoryContext();
  const { dispatchWinner } = getWinnerContext();
  const { timer, dispatchTimer } = getTimerContext();
  const {playingSettings}= getPlayingSettingsContext()
  const {tileCount} = playingSettings
  const playAgainHandler = function () {
    resetBoard(dispatchBoard,tileCount);
    eraseHistories(dispatchHistory);
    setTimeTravelState(dispatchHistory, null);
    resetWinner(dispatchWinner,play);
    if (timer.timerEnabled) startTimer(dispatchTimer);
  };
  return (
    <div>
      <button onClick={playAgainHandler}>Play again</button>
    </div>
  );
}

export default PlayAgain;
