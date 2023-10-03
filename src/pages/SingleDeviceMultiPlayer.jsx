import Game from "../components/Game";
import GameProvider from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { Navigate } from "react-router-dom";

function SingleDeviceMultiPlayer() {
  const { playingSettings } = getPlayingSettingsContext();
  if (!playingSettings.playingType) return <Navigate to="/" replace={true} />;
  else if (!playingSettings.tileCount) return <Navigate to="/chooseplaytilescount" replace={true} />;
  else if (!playingSettings.playingLevel) return <Navigate to="/chooseplayinglevel" replace={true} />;

  return (
    <div>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default SingleDeviceMultiPlayer;
