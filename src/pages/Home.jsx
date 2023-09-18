import { Link } from "react-router-dom";
import { setPlayingType, usePlayingSettingsDispatch } from "../context/PlaySettingsContext";

function Home() {
  const dispatchPlayingSettings = usePlayingSettingsDispatch();
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
      </div>
    </div>
  );
}

export default Home;
