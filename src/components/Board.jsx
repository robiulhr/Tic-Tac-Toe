import Square from "./Square";
import Timer from "./Timer";
import { getWinner} from "../context/GameContexts/WinnerContext";
import { getNextMove } from "../context/GameContexts/PlayerMoveContext";
import { getTimer } from "../context/GameContexts/TimerContext";

function Board() {
  const winner = getWinner()
  const nextMove = getNextMove()
  const timer = getTimer()
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
      {timer.timerEnabled && (
        <Timer />
      )}
      {squareRows.map((ele, ind) => {
        return (
          <div key={ind} className="row">
            {ele.map((element, index) => {
              const squareElement = (
                <Square
                  key={squareIndex}
                  squareIndex={squareIndex}
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
