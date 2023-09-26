import { useEffect, useState, useCallback } from "react";
import Board from "./Board";
import History from "./History";
import PlayAgain from "./PlayAgain";
import Popup from "reactjs-popup";
import { Link, useBeforeUnload } from "react-router-dom";
import { resetBoard, setTimerEnabled, setTimerLength, startTimer } from "../actions/GameActions";
import { getBoardContext, getHistoryContext, getTimerContext, getWinnerContext } from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
function Game() {
  const { board, dispatchBoard } = getBoardContext();
  const { timer, dispatchTimer } = getTimerContext();
  const { winner, dispatchWinner } = getWinnerContext();
  const { history, dispatchHistory } = getHistoryContext();
  const { histories } = history;
  const { playingSettings } = getPlayingSettingsContext();
  const [showAlert, setShowAlert] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    const { playingType, playingLevel, tileCount } = playingSettings;
    // handle timer settings according to the playing settings
    if (playingType === "singleDeviceMultiPlayer" && playingLevel === "beginner") {
      setTimerEnabled(dispatchTimer, false);
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

  // save it off before users navigate away
  // useBeforeUnload(
  //   useCallback(
  //     (e) => {
  //       console.log("histories", histories);
  //       if (histories.length > 0) {
  //         e.preventDefault();
  //         console.log("Are you sure you want to leave this page?");
  //         // Prompt a confirmation message when the user tries to leave the route
  //         e.returnValue = "Are you sure you want to leave this page?";
  //       }
  //     },
  //     [histories]
  //   )
  // );

  // useEffect(() => {
  //   console.log("histories value", histories);
  //   if (histories.length === 1) {
  //     setShowAlert(true);
  //   }
  // }, [histories]);

  // useEffect(() => {
  //   console.log("showAlert value", showAlert);
  //   const beforeunloadHandler = function (e) {
  //     if (showAlert) {
  //       console.log("hello world", showAlert);
  //       e.preventDefault();
  //       console.log(e);
  //       e.returnValue = "";
  //     }
  //   };
  //   window.addEventListener("beforeunload", beforeunloadHandler);
  //   return () => {
  //     console.log("hello world from return of beforeunload");
  //     window.removeEventListener("beforeunload", beforeunloadHandler);
  //   };
  // }, [showAlert]);

  return (
    <div className="game_wrapper">
      <div className="back_button">
        <button>Back</button>
      </div>
      <div className="title">
        <h1 className="game_title">Tic Tac Toe Game </h1>
      </div>
      <div className="gameContents_upper">
        {<Board firstRender={firstRender} />}
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
