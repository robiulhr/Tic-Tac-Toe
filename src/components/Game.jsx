import { useEffect, useState } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
    const [nextMove, setNextMove] = useState(0);
    const [squares, setSquares] = useState(new Array(9).fill(null));
    const [history, setHistory] = useState([]);
    const [timeTravelState, settimeTravelState] = useState(null);
    const nextMoveHandler = () => {
      // 0 for o user and 1 for x user
      setNextMove(nextMove === 0 ? 1 : 0);
    };
  
    const squareHandler = (fromHistory, squares, squareCount) => {
      const newSquare = squares;
      if (!fromHistory) {
        const changedElement =
          nextMove === 0
            ? (newSquare[squareCount] = "O")
            : (newSquare[squareCount] = "X");
        const changedArr = [
          ...newSquare.slice(0, squareCount),
          changedElement,
          ...newSquare.slice(squareCount + 1),
        ];
        setSquares(changedArr);
        console.log(newSquare)
      } else {
        setSquares(newSquare);
      }
    };
  
    const historyHandler = (squaresHistory,resetedHistory) => {
      console.log(squaresHistory,resetedHistory)
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
        console.log(history,"history")
        resetedHistoryArr = history.slice(0, timeTravelState + 1);
      }
      return resetedHistoryArr
    };
  const makeMove = (currentMove, traveling) => {
    const newSquare = [...squares];
    // console.log('current move...', currentMove);return;
    const changedElement =
        nextMove === 0
            ? (newSquare[currentMove] = "O")
            : (newSquare[currentMove] = "X");
        const changedArr = [
            ...newSquare.slice(0, currentMove),
            changedElement,
            ...newSquare.slice(currentMove + 1),
        ];
    traveling ? setHistory([...history.slice(0, timeTravelState + 1), changedArr]) : setHistory([...history, changedArr]);

    setSquares(changedArr);
    return;
  }
  useEffect(()=>{
    console.log("history inside game useEffect",history)
  },[history])
    return (
      <div>
        <h1 className="game_title">Tic Tac Toe Game </h1>
        <div className="gameContents">
          <Board
            nextMove={nextMove}
            history={history}
            nextMoveHandler={nextMoveHandler}
            timeTravelState={timeTravelState}
            resetTimeTravelState={resetTimeTravelState}
            historyHandler={historyHandler}
            squares={squares}
            squareHandler={squareHandler}
            resetHistoryHandler={resetHistoryHandler}
            makeMove={makeMove}
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