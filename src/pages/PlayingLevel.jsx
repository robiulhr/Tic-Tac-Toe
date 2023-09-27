import { Link, Navigate } from "react-router-dom";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { setPlayingLevel } from "../actions/PlayingSettingsActions";
import { useNavigate } from "react-router-dom";

function PlayingLevel() {
  const navigate = useNavigate();
  const { playingSettings, dispatchPlayingSettings } = getPlayingSettingsContext();
  if (!playingSettings.playingType) return <Navigate to="/" replace={true} />;
  else if (!playingSettings.tileCount) return <Navigate to="/chooseplaytilescount" replace={true} />;

  return (
    <div>
      <h4 style={{ textAlign: "center", margin: "10px" }}>Choose Playing Level</h4>
      <div className="play_options">
        <button
          onClick={() => {
            setPlayingLevel(dispatchPlayingSettings, "beginner");
            navigate(`/${playingSettings.playingType}`);
          }}
        >
          Beginner Level
        </button>
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
