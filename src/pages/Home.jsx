import { Link } from "react-router-dom";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { useEffect } from "react";
import { resetPlayingSettings, setPlayingType } from "../actions/PlayingSettingsActions";

function Home() {
  const { dispatchPlayingSettings } = getPlayingSettingsContext();

  useEffect(() => {
    // reset all player settings
    resetPlayingSettings(dispatchPlayingSettings);
  }, []);

  return (
    <div className="content_wrapper">
      <h1>Tic Tac Toe Game</h1>
      {/* <h3>How do you want to play?</h3> */}
      <div className="play_options">
        <Link
          className="button"
          onClick={() => {
            setPlayingType(dispatchPlayingSettings, "singledevicemultiplayer");
          }}
          to={`singledevicemultiplayer`}
        >
          Single Device Multiplayer
        </Link>
        {/* <Link to={`chooseplaytilescount`}>
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
        </Link> */}
      </div>
    </div>
  );
}

export default Home;
