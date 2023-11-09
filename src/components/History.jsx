import GoToMove from "./GoToMove";
import { useEffect, useState } from "react";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { getBoardContext, getHistoryContext, getTimerContext } from "../context/GameContext";
import { resetBoard, setSquaresForTimetravel, setTimeTravelState } from "../actions/GameActions";
import Pagination from "rc-pagination";
function History() {
  const { board, dispatchBoard } = getBoardContext();
  const { squares } = board;
  const { playingSettings } = getPlayingSettingsContext();
  const { history, dispatchHistory } = getHistoryContext();
  const { histories } = history;
  const timer = getTimerContext();
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const [timeTakenButtonShown, settimeTakenButtonShown] = useState(null);
  // define timeTravelHandler function
  const timeTravelHandler = (moveCount) => {
    if (moveCount < 0) {
      resetBoard(dispatchBoard, playingSettings.tileCount);
    } else {
      setSquaresForTimetravel(dispatchBoard, histories[moveCount]);
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
      {histories.slice((currentPage - 1) * 5, (currentPage - 1) * 5 + 5).map((ele, ind) => {
        const index = (currentPage - 1) * 5 + ind;
        return <GoToMove key={index} moveCount={index} timeTakenButtonShown={timeTakenButtonShown} timeTakenBtnShownHandler={timeTakenBtnShownHandler} timeTravelHandler={timeTravelHandler} />;
      })}
      {histories.length > 5 && (
        <div className="pagination_container">
          <Pagination simple onChange={onPageChange} current={currentPage} pageSize={5} total={histories.length} />
        </div>
      )}
    </div>
  );
}

export default History;
