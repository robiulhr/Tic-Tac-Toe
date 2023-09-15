function GoToMove({
  moveCount,
  timeTravelHandler,
  timeTakenButtonShown,
  timeTakenBtnShownHandler,
}) {
  const goToMoveHandler = () => {
    timeTravelHandler(moveCount);
    timeTakenBtnShownHandler(moveCount);
  };
  const buttonText = `Go to move #${moveCount + 1}`;
  return (
    <div className="goToMove">
      <button onClick={goToMoveHandler}>{buttonText}</button>
      {timeTakenButtonShown === moveCount && <button>Time taken</button>}
    </div>
  );
}

export default GoToMove;
