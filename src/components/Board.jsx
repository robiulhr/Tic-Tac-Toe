import Square from "./Square";
import Timer from "./Timer";
import { useWinnerContext } from "../context/GameContexts/WinnerContext";
import { useMoveContext } from "../context/GameContexts/PlayerMoveContext";
import { useTimerContext } from "../context/GameContexts/TimerContext";

function Board() {
  const winner = useWinnerContext()
  const nextMove = useMoveContext()
  const timer = useTimerContext()
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
