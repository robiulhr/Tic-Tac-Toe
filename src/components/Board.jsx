import { useState } from "react";
import Square from "./Square";

function Board({
    nextMove,
    nextMoveHandler,
    timeTravelState,
    resetTimeTravelState,
    historyHandler,
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
  
    return (
      <div className="board">
        <div>
          {winnerTitle && <h3>{winnerTitle}</h3>}
          {drawTitle && <h3>{drawTitle}</h3>}
          {nextMoveTitle && !winnerTitle && !drawTitle && (
            <h3> {nextMoveTitle}</h3>
          )}
        </div>
        <div className="row">
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={0}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={1}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={2}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
        </div>
        <div className="row">
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={3}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={4}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={5}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
        </div>
        <div className="row">
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={6}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={7}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
          <Square
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            squares={squares}
            squareCount={8}
            squareHandler={squareHandler}
            winner={winner}
            winnerHandler={winnerHandler}
            historyHandler={historyHandler}
            resetHistoryHandler={resetHistoryHandler}
          />
        </div>
      </div>
    );
  }
  
export default Board