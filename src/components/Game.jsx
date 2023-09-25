import { useEffect, useState, useCallback } from "react";
import ThreeTilesBoard from "./ThreeTilesBoard";
import FourTilesBoard from "./FourTilesBoard";
import FiveTilesBoard from "./FiveTilesBoard";
import History from "./History";
import PlayAgain from "./PlayAgain";
import Popup from "reactjs-popup";
import { getWinner } from "../context/GameContexts/WinnerContext";
import { getHistories } from "../context/GameContexts/HistoryContext";
import { Link, useLocation, useNavigate, useBeforeUnload } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getTimer, startTimer, setTimerEnabled, setTimerLength, useTimerDispatch } from "../context/GameContexts/TimerContext";
import { getPlayingSettings } from "../context/PlaySettingsContext";
function Game() {
  const winner = getWinner();
  const histories = getHistories();
  const dispatchTimer = useTimerDispatch();
  const timer = getTimer();
  const playingSettings = getPlayingSettings();
  
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

  // save it off before users navigate away
  // useBeforeUnload(
  //   useCallback((e) => {
  //     e.preventDefault();
  //     console.log("Are you sure you want to leave this page?");
  //     // Prompt a confirmation message when the user tries to leave the route
  //     e.returnValue = "Are you sure you want to leave this page?";
  //   })
  // );
  console.log(useBeforeUnload);

  // useEffect(() => {
  //   console.log("hello world from beforeunload")
  //   const beforeUnloadHandler = function(e) {
  //     e.preventDefault();
  //     console.log("Are you sure you want to leave this page?");
  //     // Prompt a confirmation message when the user tries to leave the route
  //     e.returnValue = "Are you sure you want to leave this page?";
  //     alert("hello world")
  //   };
  //   window.addEventListener("beforeUnload", beforeUnloadHandler);

  //   return () => {
  //   console.log("hello world from beforeunload return")
  //     // setTimeout(() => {
  //     window.removeEventListener("beforeUnload", beforeUnloadHandler);
  //     // }, 100);
  //   };
  // }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Your condition to allow or prevent navigation
      if (!allowNavigation) {
        e.preventDefault();
        e.returnValue = ""; // Required for some browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [allowNavigation]);

  useEffect(() => {
    console.log(confirmValue);
    window.history.pushState(null, null, window.location.pathname);
    const popStateHandler = function (event) {
      console.log("from insde the event listerner.");
      event.preventDefault();
      // The popstate event is fired each time when the current history entry changes.
      const con = confirm("You pressed a Back button! Are you sure?!");
      setconfirmValue(con);
      if (confirmValue === true) {
        // Call Back button programmatically as per user confirmation.
        window.history.back();
        // Uncomment below line to redirect to the previous page instead.
        // window.location = document.referrer // Note: IE11 is not supporting this.
      } else {
        // Stay on the current page.
        // window.history.pushState(null, null, window.location.pathname);
      }
    };
    // window.addEventListener("popstate", popStateHandler, false);
    // const popStateHandler = function (event) {
    //   event.preventDefault();
    //   // Check your condition here
    //   // if (confirmValue) {
    //     console.log("from inside the if condition.")
    //     // Allow the back button to work as usual
    //   // } else {
    //     // Prevent the back button action and provide feedback
    //     alert("You can't go back in this context.");
    //     // history.pushState(null, null, window.location.href);
    //   // }
    // }
    // window.addEventListener('popstate', popStateHandler);
    return () => {
      console.log("from inside the return");
      // setTimeout(() => {
      window.removeEventListener("popstate", popStateHandler);
      // }, 100);
    };
  }, []);

  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);

  // useEffect(() => {
  // console.log(history)
  // const unHistory = history.listen((location) => {
  //   if (history.action === "PUSH") {
  //     console.log("pushing to the history");
  //   }
  //   if (history.action === "POP") {
  //     alert("poping to the history");
  //     console.log("poping to the history");
  //   }
  // });
  // return unHistory;
  // }, []);

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
