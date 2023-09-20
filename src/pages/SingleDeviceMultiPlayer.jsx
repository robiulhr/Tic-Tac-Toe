import Game from "../components/Game";
import { getPlayingSettings } from "../context/PlaySettingsContext";
import { Navigate } from "react-router-dom";
import PlayerMoveProvider from "../context/GameContexts/PlayerMoveContext";
import TimeTravelProvider from "../context/GameContexts/TimeTravelContext";
import HistoryProvider from "../context/GameContexts/HistoryContext";
import TimerProvider from "../context/GameContexts/TimerContext";
import WinnerProvider from "../context/GameContexts/WinnerContext";
import ThreeTilesSquaresProvider from "../context/GameContexts/ThreeTilesSquareContext";
import FourTilesSquaresProvider from "../context/GameContexts/FourTilesSquareContext";
import FiveTilesSquaresProvider from "../context/GameContexts/FiveTilesSquareContext";

function SingleDeviceMultiPlayer() {
  const playingSettings = getPlayingSettings();
  if (!playingSettings.playingType) return <Navigate to="/" replace={true} />;
  else if (!playingSettings.tileCount) return <Navigate to="/chooseplaytilescount" replace={true} />;
  else if (!playingSettings.playingLevel) return <Navigate to="/chooseplayinglevel" replace={true} />;
  return (
    <PlayerMoveProvider>
      <TimeTravelProvider>
        <HistoryProvider>
          <TimerProvider>
            <WinnerProvider>
              <ThreeTilesSquaresProvider>
                <FourTilesSquaresProvider>
                  <FiveTilesSquaresProvider>
                    <div>
                      <Game />
                    </div>
                  </FiveTilesSquaresProvider>
                </FourTilesSquaresProvider>
              </ThreeTilesSquaresProvider>
            </WinnerProvider>
          </TimerProvider>
        </HistoryProvider>
      </TimeTravelProvider>
    </PlayerMoveProvider>
  );
}

export default SingleDeviceMultiPlayer;
