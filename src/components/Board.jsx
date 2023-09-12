import { useState } from "react";
import Square from "./Square";
import Timer from "./Timer";

function Board({
  nextMove,
  makeMove,
  squares,
  winner,
  timerEnabled,
  timerRunning,
  timerHandler,
  timerValue
}) {
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
      {timerEnabled && (
        <Timer timerHandler={timerHandler} timerRunning={timerRunning} timerValue={timerValue} />
      )}
      {squareRows.map((ele, ind) => {
        return (
          <div key={ind} className="row">
            {ele.map((element, index) => {
              const squareElement = (
                <Square
                  key={squareIndex}
                  squares={squares}
                  makeMove={makeMove}
                  squareCount={squareIndex}
                />
              );
              squareIndex++;
              return squareElement;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
