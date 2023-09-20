import { getFiveTilesSquares } from "../context/GameContexts/FiveTilesSquareContext";
import { getFourTilesSquares } from "../context/GameContexts/FourTilesSquareContext";
import { getThreeTilesSquares } from "../context/GameContexts/ThreeTilesSquareContext";
import { getPlayingSettings } from "../context/PlaySettingsContext";

function Square({ makeMove, squareIndex }) {
  const playingSettings = getPlayingSettings();
  const threeTilessquares = getThreeTilesSquares();
  const fourTilessquares = getFourTilesSquares();
  const fiveTilessquares = getFiveTilesSquares();
  return (
    <div className="square">
      <button
        onClick={() => {
          makeMove(squareIndex);
        }}
      >
        {playingSettings.tileCount === 3 && threeTilessquares[squareIndex]}
        {playingSettings.tileCount === 4 && fourTilessquares[squareIndex]}
        {playingSettings.tileCount === 5 && fiveTilessquares[squareIndex]}
      </button>
    </div>
  );
}

export default Square;
