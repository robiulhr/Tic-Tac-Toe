import { Link, Navigate } from "react-router-dom";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { setPlayingLevel } from "../actions/PlayingSettingsActions";

function PlayingLevel() {
  const { playingSettings, dispatchPlayingSettings } = getPlayingSettingsContext();
  if (!playingSettings.playingType) return <Navigate to="/" replace={true} />;
  else if (!playingSettings.tileCount) return <Navigate to="/chooseplaytilescount" replace={true} />;
  return (
    <div>
      <h4 style={{ textAlign: "center", margin: "10px" }}>Choose Playing Level</h4>
      <div className="play_options">
        <Link to={`/${playingSettings.playingType}`}>
          <button
            onClick={() => {
              setPlayingLevel(dispatchPlayingSettings, "beginner");
            }}
          >
            Beginner Level
          </button>
        </Link>
        <Link to={`/${playingSettings.playingType}`}>
          <button
            onClick={() => {
              setPlayingLevel(dispatchPlayingSettings, "medium");
            }}
          >
            Medium Level
          </button>
        </Link>
        <Link to={`/${playingSettings.playingType}`}>
          <button
            onClick={() => {
              setPlayingLevel(dispatchPlayingSettings, "expert");
            }}
          >
            Expert Level
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PlayingLevel;
