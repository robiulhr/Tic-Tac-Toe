import { Link } from "react-router-dom";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { useEffect, useState } from "react";
import { resetPlayingSettings, setPlayingType } from "../actions/PlayingSettingsActions";
import { createBrowserHistory } from "history";

function Home() {
  const { dispatchPlayingSettings } = getPlayingSettingsContext();
  const [shouldUnload, setShouldUnload] = useState(true);
  let BrowserHistory = createBrowserHistory();

  useEffect(() => {
    // reset all player settings
    resetPlayingSettings(dispatchPlayingSettings);
  }, []);

  // useEffect(() => {
  //   let unblock = BrowserHistory.block((tx) => {
  //     // Navigation was blocked! Let's show a confirmation dialog
  //     // so the user can decide if they actually want to navigate
  //     // away and discard changes they've made in the current page.
  //     let url = tx.location.pathname;
  //     console.log(tx);
  //     if (window.confirm(`Are you sure you want to go to ${url}?`)) {
  //       // Unblock the navigation.
  //       unblock();
  //       // Retry the transition.
  //       tx.retry();
  //     }
  //   });
  //   return unblock;
  // });
  useEffect(() => {
    // console.log("hello world", shouldUnload);
    const beforeunloadHandler = function (e) {
      if (shouldUnload) {
        e.preventDefault();
        console.log(e);
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeunloadHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeunloadHandler);
    };
    // window.onbeforeunload = function() {
    //   console.log('new funciton has been added.')
    //   return "Are you sure?"}
  }, [shouldUnload]);

  return (
    <div className="home_wrapper">
      <h1>Tic Tac Toe Game</h1>
      <h3>How do you want to play?</h3>
      <div className="play_options">
        <Link to='chooseplaytilescount'>
          single
        </Link>
        <Link to={`chooseplaytilescount`}>
          <button
            onClick={() => {
              setPlayingType(dispatchPlayingSettings, "playWithComputer");
            }}
          >
            Play With Computer
          </button>
        </Link>
        <Link to={`chooseplaytilescount`}>
          <button
            onClick={() => {
              setPlayingType(dispatchPlayingSettings, "multiPlayer");
            }}
          >
            Play With A Friend
          </button>
        </Link>
        <button
          onClick={() => {
            setShouldUnload(() => {
              return !shouldUnload && true;
            });
          }}
        >
          set Sound unload
        </button>
      </div>
    </div>
  );
}

export default Home;
