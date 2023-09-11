import { useEffect } from "react";

function GoToMove({
    moveCount,
    timeTravelStateHandler,
    history,
    squareHandler,
  }) {
    const goToMoveHandler = () => {
      timeTravelStateHandler(moveCount);
      squareHandler(true, history[moveCount]);
    };
    const buttonText = `Go to move #${moveCount + 1}`;
    return (
      <div className="goToMove">
        <button onClick={goToMoveHandler}>{buttonText}</button>
      </div>
    );
  }
  
export default GoToMove