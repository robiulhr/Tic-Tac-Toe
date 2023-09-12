function GoToMove({
    moveCount,
    timeTravelHandler,
  }) {
    const goToMoveHandler = () => {
      timeTravelHandler(moveCount);
    };
    const buttonText = `Go to move #${moveCount + 1}`;
    return (
      <div className="goToMove">
        <button onClick={goToMoveHandler}>{buttonText}</button>
      </div>
    );
  }
  
export default GoToMove