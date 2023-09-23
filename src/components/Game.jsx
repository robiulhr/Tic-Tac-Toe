import { useEffect, useState } from "react";
import ThreeTilesBoard from "./ThreeTilesBoard";
import FourTilesBoard from "./FourTilesBoard";
import FiveTilesBoard from "./FiveTilesBoard";
import History from "./History";
import PlayAgain from "./PlayAgain";
import Popup from "reactjs-popup";
import { getWinner } from "../context/GameContexts/WinnerContext";
import { getHistories } from "../context/GameContexts/HistoryContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getTimer, startTimer, setTimerEnabled, setTimerLength, useTimerDispatch } from "../context/GameContexts/TimerContext";
import { getPlayingSettings } from "../context/PlaySettingsContext";
function Game() {
  const winner = getWinner();
  const histories = getHistories();
  const dispatchTimer = useTimerDispatch();
  const timer = getTimer();
  const playingSettings = getPlayingSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // handle timer settings according to the playing settings
    if (playingSettings.playingType === "singleDeviceMultiPlayer" && playingSettings.playingLevel === "beginner") {
      setTimerEnabled(dispatchTimer, false);
    } else if (playingSettings.playingType === "singleDeviceMultiPlayer" && playingSettings.playingLevel === "medium") {
      setTimerEnabled(dispatchTimer, true);
      setTimerLength(dispatchTimer, "10");
    } else if (playingSettings.playingType === "singleDeviceMultiPlayer" && playingSettings.playingLevel === "expert") {
      setTimerEnabled(dispatchTimer, true);
      setTimerLength(dispatchTimer, "5");
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      console.log("Are you sure you want to leave this page?");
      // Prompt a confirmation message when the user tries to leave the route
      e.returnValue = "Are you sure you want to leave this page?";
    };

    // Add a beforeunload event listener
    window.addEventListener("beforeunload", handleBeforeUnload, { capture: true });

    // let confirmValue;
    // window.history.pushState(null, null, window.location.pathname);
    // const popStateHandler = function (event) {
    //   event.preventDefault();
    //   // The popstate event is fired each time when the current history entry changes.
    //   confirmValue = confirm("You pressed a Back button! Are you sure?!");
    //   if (confirmValue === true) {
    //     // Call Back button programmatically as per user confirmation.
    //     window.history.back();
    //     // Uncomment below line to redirect to the previous page instead.
    //     // window.location = document.referrer // Note: IE11 is not supporting this.
    //   } else {
    //     // Stay on the current page.
    //     window.history.pushState(null, null, window.location.pathname);
    //   }
    // };
    // window.addEventListener("popstate", popStateHandler, false);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // setTimeout(() => {
      //   window.removeEventListener("popstate", popStateHandler);
      // }, 100);
    };
  }, []);

  return (
    <div className="game_wrapper">
      <div className="back_button">
        <button>Back</button>
      </div>
      <div className="title">
        <h1 className="game_title">Tic Tac Toe Game </h1>
      </div>
      <div className="gameContents_upper">
        {playingSettings.tileCount === 3 && <ThreeTilesBoard />}
        {playingSettings.tileCount === 4 && <FourTilesBoard />}
        {playingSettings.tileCount === 5 && <FiveTilesBoard />}
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
