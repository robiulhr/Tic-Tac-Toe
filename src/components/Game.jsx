import Board from "./Board";
import History from "./History";
import PlayAgain from "./PlayAgain";
import Popup from "reactjs-popup";
import { getWinner } from "../context/GameContexts/WinnerContext";
import { getHistories } from "../context/GameContexts/HistoryContext";
import { Link } from "react-router-dom";
import { getTimer, startTimer, useTimerDispatch } from "../context/GameContexts/TimerContext";
function Game() {
  const winner = getWinner();
  const histories = getHistories();
  const dispatchTimer = useTimerDispatch();
  const timer = getTimer();
  return (
    <div className="game_wrapper">
      <div className="title">
        <h1 className="game_title">Tic Tac Toe Game </h1>
      </div>
      <div className="gameContents_upper">
        <Board />
        {timer.timerEnabled && (
          <Popup defaultOpen modal>
            {(close) => (
              <div className="modal">
                <button className="close">
                  <Link to={"/"}>&times;</Link>
                </button>
                <div className="header"> Wanna Start Playing? </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      close();
                      startTimer(dispatchTimer);
                    }}
                  >
                    Yes
                  </button>
                  <Link to={"/"}>
                    <button className="button">No</button>
                  </Link>
                </div>
              </div>
            )}
          </Popup>
        )}

        {histories.length > 0 && <History />}
      </div>
      <div className="gameContents_bottom">{winner && <PlayAgain />}</div>
    </div>
  );
}

export default Game;
