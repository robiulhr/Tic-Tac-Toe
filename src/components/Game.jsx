import { useEffect, useState, useCallback } from "react";
import Board from "./Board";
import History from "./History";
import PlayAgain from "./PlayAgain";
import Popup from "reactjs-popup";
import { Link, useBeforeUnload } from "react-router-dom";
import { resetBoard, setTimerEnabled, setTimerLength, startTimer } from "../actions/GameActions";
import { getBoardContext, getHistoryContext, getTimerContext, getWinnerContext } from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { createBrowserHistory } from "history";
function Game() {
  // Create your own history instance.
  let BrowserHistory = createBrowserHistory();
  // const { board, dispatchBoard } = getBoardContext();
  // const { timer, dispatchTimer } = getTimerContext();
  // const { winner, dispatchWinner } = getWinnerContext();
  // const { history, dispatchHistory } = getHistoryContext();
  // const { histories } = history;
  // const { playingSettings } = getPlayingSettingsContext();
  const [showAlert, setShowAlert] = useState(false);
  // const [firstRender, setFirstRender] = useState(true);
  // useEffect(() => {
  //   const { playingType, playingLevel, tileCount } = playingSettings;
  //   // handle timer settings according to the playing settings
  //   if (playingType === "singleDeviceMultiPlayer" && playingLevel === "beginner") {
  //     setTimerEnabled(dispatchTimer, false);
  //   } else if (playingType === "singleDeviceMultiPlayer" && playingLevel === "medium") {
  //     setTimerEnabled(dispatchTimer, true);
  //     setTimerLength(dispatchTimer, "10");
  //   } else if (playingType === "singleDeviceMultiPlayer" && playingLevel === "expert") {
  //     setTimerEnabled(dispatchTimer, true);
  //     setTimerLength(dispatchTimer, "5");
  //   }
  //   // handle Board Square array according to the playing settings
  //   resetBoard(dispatchBoard, playingSettings.tileCount, board);
  //   setFirstRender(false);
  // }, []);

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

  const showAlertHandler = function () {
    if (!showAlert) {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    console.log("from outside the popStateHandler log ran");
    // window.history.pushState(null, null, window.location.pathname);
    // const popStateHandler = function (event) {
    //   let confirmValue;
    //   console.log("from inside the popStateHandler log ran");
    //   event.preventDefault();
    //   // The popstate event is fired each time when the current history entry changes.
    //   confirmValue = confirm("You pressed a Back button! Are you sure?!");
    //   if (confirmValue === true) {
    //     // Call Back button programmatically as per user confirmation.
    //     window.history.back();
    //     // Uncomment below line to redirect to the previous page instead.
    //     window.location = document.referrer // Note: IE11 is not supporting this.
    //   } else {
    //     // Stay on the current page.
    //     window.history.pushState(null, null, window.location.pathname);
    //   }
    // };

    // const popStateHandler = function (event) {
    //   console.log("from inside the popStateHandler log ran");
    //   const confirmValue = confirm("You pressed the Back button! Are you sure you want to leave?");
    //   if (!confirmValue) {
    //     // If the user cancels, prevent the back navigation
    //     event.preventDefault();
    //   }
    // };
    // window.addEventListener("popstate", popStateHandler, false);

    // Block navigation and register a callback that
    // fires when a navigation attempt is blocked.
    if (showAlert) {
      let unblock = BrowserHistory.block((tx) => {
        // Navigation was blocked! Let's show a confirmation dialog
        // so the user can decide if they actually want to navigate
        // away and discard changes they've made in the current page.
        let url = tx.location.pathname;
        console.log(tx);
        if (window.confirm(`Are you sure you want to go to ${url}?`)) {
          // Unblock the navigation.
          unblock();
          // Retry the transition.
          tx.retry();
        }
      });

      // const pagehideHandler = function (event) {
      //   console.log("from inside the pagehideHandler log ran");
      //   const confirmValue = confirm("You pressed the Back button! Are you sure you want to leave?");
      //   if (!confirmValue) {
      //     // If the user cancels, prevent the back navigation
      //     event.preventDefault();
      //   }
      // };
      // window.addEventListener("visibilitychange", pagehideHandler, false);
      return unblock;
    }

    // () => {
    //   console.log("from inside the popstate cleaner.");
    //   // window.removeEventListener("popstate", popStateHandler, false);
    //   // window.removeEventListener("pagehide", pagehideHandler, false);
    // };
  }, [showAlert]);

  return (
    <div className="game_wrapper">
      <div className="back_button">
        <button onClick={showAlertHandler}>Back</button>
      </div>
      <div className="title">
        <h1 className="game_title">Tic Tac Toe Game </h1>
      </div>
      {/* <div className="gameContents_upper">
        {<Board firstRender={firstRender} showAlertHandler={showAlertHandler} />}
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
      <div className="gameContents_bottom">{winner && <PlayAgain />}</div> */}
    </div>
  );
}

export default Game;
