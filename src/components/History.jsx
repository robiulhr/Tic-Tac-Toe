import GoToMove from "./GoToMove";
import {
  useTimeTravelContext,
  useTimeTravelStateDispatchContext,
} from "../context/GameContexts/TimeTravelContext";
import { useDispatchNextMove } from "../context/GameContexts/PlayerMoveContext";
import { useHistoriesContext } from "../context/GameContexts/HistoryContext";
import { useGameSquaresDispatchContext } from "../context/GameContexts/GameSquareContext";
import { useState } from "react";
function History() {
  const [dispatchTimeTravelState] = [
    useTimeTravelContext(),
    useTimeTravelStateDispatchContext(),
  ];
  const dispatchNextMove = useDispatchNextMove();
  const history = useHistoriesContext();
  const dispatchSquares = useGameSquaresDispatchContext();
  const [timeTakenButtonShown, settimeTakenButtonShown] = useState(null);
  // define timeTravelHandler function
  const timeTravelHandler = (moveCount) => {
    if (moveCount < 0) {
      dispatchSquares({ type: "reset" });
      dispatchNextMove({ type: "reset" });
    } else {
      dispatchSquares({
        type: "timeTravel",
        historySqures: history[moveCount].squares,
      });
      dispatchNextMove({
        type: "next",
        currentMove: history[moveCount].nextMove,
      });
    }
    dispatchTimeTravelState(moveCount);
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
