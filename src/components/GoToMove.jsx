import { getHistoryContext } from "../context/GameContext";

function GoToMove({ moveCount, timeTravelHandler, timeTakenButtonShown, timeTakenBtnShownHandler }) {
  const { histories } = getHistoryContext();
  const goToMoveHandler = () => {
    timeTravelHandler(moveCount);
    timeTakenBtnShownHandler(moveCount);
  };
  const buttonText = `Go to move #${moveCount + 1}`;
  return (
    <div className="goToMove">
      <button onClick={goToMoveHandler}>{buttonText}</button>
      {timeTakenButtonShown === moveCount && <button>{`Time Taken ${histories[moveCount].moveTimeTaken}s`}</button>}
    </div>
  );
}

export default GoToMove;
