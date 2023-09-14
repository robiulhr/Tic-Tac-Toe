import { useState } from "react";

function GoToMove({ moveCount, timeTravelHandler }) {
  const [timeTakenBtnShown, setTimeTakenBtnShown] = useState(false);

  const goToMoveHandler = () => {
    timeTravelHandler(moveCount);
    setTimeTakenBtnShown(!timeTakenBtnShown);
  };
  const buttonText = `Go to move #${moveCount + 1}`;
  return (
    <div className="goToMove">
      <button onClick={goToMoveHandler}>{buttonText}</button>
      {timeTakenBtnShown && <button>Time taken</button>}
    </div>
  );
}

export default GoToMove;
