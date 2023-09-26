import { Link } from "react-router-dom";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { useEffect, useState } from "react";
import { resetPlayingSettings, setPlayingType } from "../actions/PlayingSettingsActions";

function Home() {
  const {dispatchPlayingSettings} = getPlayingSettingsContext();
  const [shouldUnload, setShouldUnload] = useState(false);

  useEffect(() => {
    // reset all player settings
    resetPlayingSettings(dispatchPlayingSettings);
  }, []);

  useEffect(() => {
    console.log("hello world", shouldUnload);
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
  }, [shouldUnload]);

  return (
    <div className="home_wrapper">
      <h1>Tic Tac Toe Game</h1>
      <h3>How do you want to play?</h3>
      <div className="play_options">
        <Link to={`chooseplaytilescount`}>
          <button
            onClick={() => {
              setPlayingType(dispatchPlayingSettings, "singleDeviceMultiPlayer");
            }}
          >
            Single Device Multi Player
          </button>
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
