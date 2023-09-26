import GoToMove from "./GoToMove";
import { useState } from "react";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { getBoardContext, getHistoryContext, getTimerContext } from "../context/GameContext";
import { resetBoard, setNextMove, setSquaresForTimetravel, setTimeTravelState } from "../actions/GameActions";

function History() {
  const { board, dispatchBoard } = getBoardContext();
  const { squares } = board;
  const { playingSettings } = getPlayingSettingsContext();
  const { history, dispatchHistory } = getHistoryContext();
  const { histories } = history;
  const timer = getTimerContext();
  const [timeTakenButtonShown, settimeTakenButtonShown] = useState(null);
  // define timeTravelHandler function
  const timeTravelHandler = (moveCount) => {
    if (moveCount < 0) {
      resetBoard(dispatchBoard, playingSettings.tileCount);
    } else {
      setSquaresForTimetravel(dispatchBoard, histories[moveCount].squares);
      setNextMove(dispatchBoard);
    }
    setTimeTravelState(dispatchHistory, moveCount);
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
      {histories.map((ele, ind) => {
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
