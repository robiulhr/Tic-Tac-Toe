import { useState } from "react";
import "./App.css";

function Square({
  nextMoveHandler,
  timeTravelState,
  squares,
  squareCount,
  squareHandler,
  winner,
  winnerHandler,
  historyHandler,
  resetHistoryHandler,
}) {
  const squareClickHandler = () => {
    if (!squares[squareCount] && !winner) {
      nextMoveHandler();
      squareHandler(false, squares, squareCount);
      if (typeof timeTravelState === "number" && timeTravelState !== undefined) {
        resetHistoryHandler(timeTravelState);
      }
      historyHandler(squares);
      // check if any winner found
      const gotWinner = checkWinner(squares);
      if (gotWinner) winnerHandler(squares[squareCount]);
      else {
        // no winner found
        let isLastMove = true;
        for (let i = 0; i < squares.length; i++) {
          // if this is not the last move
          if (!squares[i]) {
            isLastMove = false;
            break;
          }
        }
        // check if the move is the last move but no winner found that means the result is draw
        isLastMove && winnerHandler("Draw");
      }
    }
  };
  return (
    <div className="square">
      <button onClick={squareClickHandler}>{squares[squareCount]}</button>
    </div>
  );
}

function Board({
  nextMove,
  nextMoveHandler,
  timeTravelState,
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

function History({ timeTravelStateHandler, history, squareHandler }) {
  const goToGameStartHandler = () => {
    timeTravelStateHandler(-1);
    squareHandler(true, []);
  };
  return (
    <div className="history">
      <h3>History</h3>
      <div className="goToMove">
        <button onClick={goToGameStartHandler}>Go to game start</button>
      </div>
      {history.map((ele, ind) => {
        return (
          <GoToMove
            key={ind}
            moveCount={ind}
            timeTravelStateHandler={timeTravelStateHandler}
            history={history}
            squareHandler={squareHandler}
          />
        );
      })}
    </div>
  );
}
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

function Game() {
  const [nextMove, setNextMove] = useState(0);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [history, setHistory] = useState([]);
  const [timeTravelState, settimeTravelState] = useState();
  const nextMoveHandler = () => {
    // 0 for o user and 1 for x user
    setNextMove(nextMove === 0 ? 1 : 0);
  };

  const squareHandler = (fromHistory, squares, squareCount) => {
    if (!fromHistory) {
      const changedElement =
        nextMove === 0
          ? (squares[squareCount] = "O")
          : (squares[squareCount] = "X");
      const changedArr = [
        ...squares.slice(0, squareCount),
        changedElement,
        ...squares.slice(squareCount + 1),
      ];
      setSquares(changedArr);
    } else {
      setSquares(squares);
    }
  };

  const historyHandler = (squaresHistory) => {
    setHistory([...history, squaresHistory]);
  };

  const timeTravelStateHandler = function (index) {
    settimeTravelState(index);
  };

  const resetHistoryHandler = function (index) {
    if(index < 0){
      setHistory([])
    }else{
      const changedHistoryArr = history.slice(0,index+1) 
      setHistory(changedHistoryArr)
    }
    console.log(history)
  };

  return (
    <div>
      <h1 className="game_title">Tic Tac Toe Game </h1>
      <div className="gameContents">
        <Board
          nextMove={nextMove}
          nextMoveHandler={nextMoveHandler}
          timeTravelState={timeTravelState}
          historyHandler={historyHandler}
          squares={squares}
          squareHandler={squareHandler}
          resetHistoryHandler={resetHistoryHandler}
        />
        <History
          timeTravelStateHandler={timeTravelStateHandler}
          history={history}
          squareHandler={squareHandler}
        />
      </div>
    </div>
  );
}

function checkWinner(squares) {
  let winner;
  const list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < list.length; i++) {
    const listElement = list[i];
    if (
      squares[listElement[0]] &&
      squares[listElement[0]] === squares[listElement[1]] &&
      squares[listElement[1]] === squares[listElement[2]]
    ) {
      winner = squares[listElement[0]];
      break;
    }
  }
  return winner;
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
