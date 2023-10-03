import { useEffect, useState, useCallback } from "react";
import Board from "./Board";
import History from "./History";
import PlayAgain from "./PlayAgain";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { resetBoard, setTimerEnabled, setTimerLength, startTimer } from "../actions/GameActions";
import { getBoardContext, getHistoryContext, getTimerContext, getWinnerContext } from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import usePreventPageLeave from "../hooks/usePreventPageLeave";
function Game() {
  const { board, dispatchBoard } = getBoardContext();
  const { timer, dispatchTimer } = getTimerContext();
  const { winner, dispatchWinner } = getWinnerContext();
  const { history, dispatchHistory } = getHistoryContext();
  const { histories } = history;
  const { playingSettings } = getPlayingSettingsContext();
  const [firstRender, setFirstRender] = useState(true);
  // prevent the page leave if the user has started playing
  const { isDirty, setIsDirty } = usePreventPageLeave();
  useEffect(() => {
    const { playingType, playingLevel, tileCount } = playingSettings;
    console.log(playingSettings)
    // handle timer settings according to the playing settings
    if (playingType === "singleDeviceMultiPlayer" && playingLevel === "beginner") {

      const timerState = setTimerEnabled(dispatchTimer, false);
      console.log(timerState)
    } else if (playingType === "singleDeviceMultiPlayer" && playingLevel === "medium") {
      setTimerEnabled(dispatchTimer, true);
      setTimerLength(dispatchTimer, "10");
    } else if (playingType === "singleDeviceMultiPlayer" && playingLevel === "expert") {
      setTimerEnabled(dispatchTimer, true);
      setTimerLength(dispatchTimer, "5");
    }
    // handle Board Square array according to the playing settings
    resetBoard(dispatchBoard, playingSettings.tileCount, board);
    setFirstRender(false);
  }, []);

  const setetIsDirtyHandler = useCallback((value) => {
    return setIsDirty(value);
  }, []);

  return (
    <div className="game_wrapper">
      <div className="back_button">
        <button onClick={() => {}}>Back</button>
      </div>
      <div className="title">
        <h1 className="game_title">Tic Tac Toe Game </h1>
      </div>
      <div className="gameContents_upper">
        {<Board firstRender={firstRender} setetIsDirtyHandler={setetIsDirtyHandler} />}
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
