import { useDispatchNextMove } from "../context/GameContexts/PlayerMoveContext";
import { useGameSquaresDispatchContext } from "../context/GameContexts/GameSquareContext";
import { useHistoriesDispatchContext } from "../context/GameContexts/HistoryContext";
import { useTimeTravelStateDispatchContext } from "../context/GameContexts/TimeTravelContext";
import { useWinnerDispatchContext } from "../context/GameContexts/WinnerContext";

function PlayAgain() {
  const dispatchNextMove = useDispatchNextMove();
  const dispatchSquares = useGameSquaresDispatchContext();
  const dispatchHistories = useHistoriesDispatchContext();
  const dispatchTimeTravelState = useTimeTravelStateDispatchContext();
  const dispatchWinner = useWinnerDispatchContext();
  const playAgainHandler = function () {
    dispatchNextMove(0);
    dispatchSquares({ type: "reset" });
    dispatchHistories({type:"erase"});
    dispatchTimeTravelState(null);
    dispatchWinner();
  };
  return (
    <div>
      <button onClick={playAgainHandler}>Play again</button>
    </div>
  );
}

export default PlayAgain;
