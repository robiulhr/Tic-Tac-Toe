import { useState } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
    const [nextMove, setNextMove] = useState(0);
    const [squares, setSquares] = useState(new Array(9).fill(null));
    const [history, setHistory] = useState([]);
    const [timeTravelState, settimeTravelState] = useState(-1);
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
  
    const historyHandler = (squaresHistory,resetedHistory) => {
        console.log(squaresHistory)
        resetedHistory ? setHistory([...resetedHistory, squaresHistory]) : setHistory([...history, squaresHistory]);
    };
  
    const timeTravelStateHandler = function (index) {
      settimeTravelState(index);
    };
  
    const resetTimeTravelState = function(){
        settimeTravelState(null)
    }

    const resetHistoryHandler = function (timeTravelState) {
        let resetedHistoryArr
      if (timeTravelState < 0) {
        resetedHistoryArr = [];
      } else {
        console.log(history)
        resetedHistoryArr = history.slice(0, timeTravelState + 1);
      }
      return resetedHistoryArr
    };
  
    return (
      <div>
        <h1 className="game_title">Tic Tac Toe Game </h1>
        <div className="gameContents">
          <Board
            nextMove={nextMove}
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
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
  


export default Game