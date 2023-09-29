import { useEffect, useState, useCallback, useContext, useRef } from "react";
import Board from "./Board";
import History from "./History";
import PlayAgain from "./PlayAgain";
import Popup from "reactjs-popup";
import { Link, useBeforeUnload, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { resetBoard, setTimerEnabled, setTimerLength, startTimer } from "../actions/GameActions";
import { getBoardContext, getHistoryContext, getTimerContext, getWinnerContext } from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { createBrowserHistory } from "history";
import { UNSAFE_NavigationContext } from "react-router-dom";
function Game() {
  // Create your own history instance.
  // let BrowserHistory = createBrowserHistory();
  // const navigate = useNavigate();
  // const { board, dispatchBoard } = getBoardContext();
  // const { timer, dispatchTimer } = getTimerContext();
  // const { winner, dispatchWinner } = getWinnerContext();
  // const { history, dispatchHistory } = getHistoryContext();
  // const { histories } = history;
  // const { playingSettings } = getPlayingSettingsContext();
  // const [showAlert, setShowAlert] = useState(false);
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

  const navigate = useNavigate();
  let BrowserHistory = createBrowserHistory();
  const [showAlert, setShowAlert] = useState(false);

  const showAlertHandler = function () {
    if (!showAlert) {
      setShowAlert(true);
    }
  };
  function blocker() {
    let unblock = BrowserHistory.block((tx) => {
      // Navigation was blocked! Let's show a confirmation dialog
      // so the user can decide if they actually want to navigate
      // away and discard changes they've made in the current page.
      let url = tx.location.pathname;
      console.log(url);
      const confirmValue = window.confirm(`Are you sure you want to go to ${url}?`);
      console.log(confirmValue, "confirmValue");
      unblock();
      if (confirmValue) {
        // Unblock the navigation.
        console.log(url, "consode from inside the conirmvalue true");
        navigate(url);
        // tx.retry();
        return true;
      } else {
        blocker();
        return false;
      }
    });
  }
  useEffect(() => {
    console.log("from outside the popStateHandler log ran");
    if (showAlert) {
      blocker();
    }
  }, [showAlert, BrowserHistory, navigate]);
  // const history = createBrowserHistory();
  // const [isDirty, setIsDirty] = useState(false);

  // // This ref is used to save the destination location to which we plan to navigate after the dirty check is complete
  // const navigateDestination = useRef();
  // const onConfirmLeave = () => {
  //   navigateDestination.current?.retry();
  // };

  // const unblockNavigationRef = useRef();

  // useEffect(() => {
  //   if (isDirty) {
  //     // Remove previous block function if exists.
  //     unblockNavigationRef.current?.();
  //     // Block route navigation requests when the isDirty flag is on.
  //     // Instead of navigating when an attempt to navigate happens, save the destination route and render the dirty prompt
  //     const currentStateValue = isDirty;
  //     unblockNavigationRef.current = history.block((transition) => {
  //       navigateDestination.current = transition;
  //       console.log(navigateDestination);
  //       const confirmValue = confirm("are you sure?");
  //       console.log(confirmValue);
  //       console.log(unblockNavigationRef);
  //       confirmValue && onConfirmLeave();
  //       unblockNavigationRef.current?.();
  //       setIsDirty((currentStateValue)=>{
  //         console.log(currentStateValue)
  //         return currentStateValue
  //       });
  //     });
  //   } else {
  //     // Unblock navigation when the dirty state is cleared
  //     unblockNavigationRef.current?.();
  //   }
  // }, [isDirty, history]);

  return (
    <div className="game_wrapper">
      <div className="back_button">
        <button onClick={() => showAlertHandler()}>Back</button>
      </div>
      {
        <div>
          <div>
            <b>There are some changes?</b>
            <br /> Are you sure you want to navigate!!!!
          </div>
          <button>No</button>
          <button>Yes</button>
        </div>
      }
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
