import GoToMove from "./GoToMove";
import { setTimeTravelState, useTimeTravelStateDispatch } from "../context/GameContexts/TimeTravelContext";
import { resetNextMove, setNextMove, useNextMoveDispatch } from "../context/GameContexts/PlayerMoveContext";
import { getHistories } from "../context/GameContexts/HistoryContext";
import { useSquareDispatch, resetSquares, setSquaresForTimetravel } from "../context/GameContexts/GameSquareContext";
import { useState } from "react";

function History() {
  const dispatchSquares = useSquareDispatch();
  const dispatchTimeTravelState = useTimeTravelStateDispatch();
  const dispatchNextMove = useNextMoveDispatch();
  const history = getHistories();
  const [timeTakenButtonShown, settimeTakenButtonShown] = useState(null);
  // define timeTravelHandler function
  const timeTravelHandler = (moveCount) => {
    if (moveCount < 0) {
      resetSquares(dispatchSquares);
      resetNextMove(dispatchNextMove);
    } else {
      setSquaresForTimetravel(dispatchSquares, history[moveCount].squares);
      setNextMove(dispatchNextMove, history[moveCount].nextMove);
    }
    setTimeTravelState(dispatchTimeTravelState,moveCount)
  };

  const timeTakenBtnShownHandler = function (index) {
    settimeTakenButtonShown(index);
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
