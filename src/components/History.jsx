import GoToMove from "./GoToMove";
import { useTimeTravelStateDispatchContext } from "../context/GameContexts/TimeTravelContext";
import { useDispatchNextMove } from "../context/GameContexts/PlayerMoveContext";
import { useHistoriesContext } from "../context/GameContexts/HistoryContext";
function History() {
  const dispatchTimeTravelState = useTimeTravelStateDispatchContext();
  const dispatchNextMove = useDispatchNextMove();
  const history = useHistoriesContext();
  // define timeTravelHandler function
  const timeTravelHandler = (moveCount) => {
    if (moveCount < 0) {
      dispatchSquares(new Array(9).fill(null));
      dispatchNextMove(0);
    } else {
      dispatchSquares(history[moveCount].square);
      dispatchNextMove(history[moveCount].nextMove);
    }
    dispatchTimeTravelState(moveCount);
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
            timeTravelHandler={timeTravelHandler}
            history={history}
          />
        );
      })}
    </div>
  );
}

export default History;
