import { Navigate } from "react-router-dom";
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
            navigate(`/singleDeviceMultiPlayer`);
          }}
        >
          Beginner Level
        </button>
        <button
          onClick={() => {
            setPlayingLevel(dispatchPlayingSettings, "medium");
            navigate(`/singleDeviceMultiPlayer`);
          }}
        >
          Medium Level
        </button>
        <button
          onClick={() => {
            setPlayingLevel(dispatchPlayingSettings, "expert");
            navigate(`/singleDeviceMultiPlayer`);
          }}
        >
          Expert Level
        </button>
      </div>
    </div>
  );
}

export default PlayingLevel;
