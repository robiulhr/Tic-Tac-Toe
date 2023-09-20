import GoToMove from "./GoToMove";
import { setTimeTravelState, useTimeTravelStateDispatch } from "../context/GameContexts/TimeTravelContext";
import { resetNextMove, setNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { getHistories } from "../context/GameContexts/HistoryContext";
import { useThreeTilesSquaresDispatch, resetThreeTilesSquares, setThreeTilesSquaresForTimetravel } from "../context/GameContexts/ThreeTilesSquareContext";
import { useFourTilesSquaresDispatch, resetFourTilesSquares, setFourTilesSquaresForTimetravel } from "../context/GameContexts/FourTilesSquareContext";
import { useFiveTilesSquaresDispatch, resetFiveTilesSquares, setFiveTilesSquaresForTimetravel } from "../context/GameContexts/FiveTilesSquareContext";
import { useState } from "react";
import { getTimer } from "../context/GameContexts/TimerContext";
import { getPlayingSettings } from "../context/PlaySettingsContext";

function History() {
  const dispatchThreeTilesSquares = useThreeTilesSquaresDispatch();
  const dispatchFourTilesSquares = useFourTilesSquaresDispatch();
  const dispatchFiveTilesSquares = useFiveTilesSquaresDispatch();
  const playingSettings = getPlayingSettings();
  const dispatchTimeTravelState = useTimeTravelStateDispatch();
  const dispatchNextMove = useNextMoveDispatch();
  const history = getHistories();
  const timer = getTimer();
  const [timeTakenButtonShown, settimeTakenButtonShown] = useState(null);
  // define timeTravelHandler function
  const timeTravelHandler = (moveCount) => {
    if (moveCount < 0) {
      playingSettings.tileCount === 3 && resetThreeTilesSquares(dispatchThreeTilesSquares);
      playingSettings.tileCount === 4 && resetFourTilesSquares(dispatchFourTilesSquares);
      playingSettings.tileCount === 5 && resetFiveTilesSquares(dispatchFiveTilesSquares);
      resetNextMove(dispatchNextMove);
    } else {
      playingSettings.tileCount === 3 && setThreeTilesSquaresForTimetravel(dispatchThreeTilesSquares, history[moveCount].squares);
      playingSettings.tileCount === 4 && setFourTilesSquaresForTimetravel(dispatchFourTilesSquares, history[moveCount].squares);
      playingSettings.tileCount === 5 && setFiveTilesSquaresForTimetravel(dispatchFiveTilesSquares, history[moveCount].squares);
      setNextMove(dispatchNextMove, history[moveCount].nextMove);
    }
    setTimeTravelState(dispatchTimeTravelState, moveCount);
  };

  const timeTakenBtnShownHandler = function (index) {
    if (timer.timerEnabled) {
      settimeTakenButtonShown(index);
    }
  };
  const goToGameStartHandler = () => {
    timeTravelHandler(-1);
  };
  return (
    <div className="history">
      <h3>History</h3>
      <div className="goToMove">
        <button onClick={goToGameStartHandler}>Go to game start</button>
      </div>
      {history.map((ele, ind) => {
        return (
          <GoToMove
            key={ind}
            moveCount={ind}
            timeTakenButtonShown={timeTakenButtonShown}
            timeTakenBtnShownHandler={timeTakenBtnShownHandler}
            timeTravelHandler={timeTravelHandler}
          />
        );
      })}
    </div>
  );
}

export default History;
