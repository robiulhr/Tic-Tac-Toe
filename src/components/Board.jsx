import { useState,useEffect } from "react";
import Square from "./Square";

function Board({
  nextMove,
  nextMoveHandler,
  timeTravelState,
  resetTimeTravelState,
  historyHandler,
  history,
  squares,
  squareHandler,
  resetHistoryHandler,
}) {
  const [winner, setWinner] = useState();
  const winnerHandler = (winner) => {
    setWinner(winner);
  };
  const winnerTitle = winner && winner !== "Draw" && `Winner : ${winner}`;
  const drawTitle = winner === "Draw" && `Result: Draw`;
  const nextMoveTitle = `Next Player Move: ${nextMove ? "X" : "O"}`;
  const squareRows = new Array(3).fill(new Array(3).fill(null));
  let squareIndex = 0;

  return (
    <div className="board">
      <div>
        {winnerTitle && <h3>{winnerTitle}</h3>}
        {drawTitle && <h3>{drawTitle}</h3>}
        {nextMoveTitle && !winnerTitle && !drawTitle && (
          <h3> {nextMoveTitle}</h3>
        )}
      </div>
      {squareRows.map((ele,ind) => {
        return <div key={ind} className="row">
          {ele.map((element,index) => {
            const squareElement =  <Square
              key={squareIndex}
              nextMoveHandler={nextMoveHandler}
              timeTravelState={timeTravelState}
              resetTimeTravelState={resetTimeTravelState}
              squares={squares}
              history={history}
              squareCount={squareIndex}
              squareHandler={squareHandler}
              winner={winner}
              winnerHandler={winnerHandler}
              historyHandler={historyHandler}
              resetHistoryHandler={resetHistoryHandler}
            />
            squareIndex++
            return squareElement
          })}
        </div>;
      })}
    </div>
  );
}

export default Board;
