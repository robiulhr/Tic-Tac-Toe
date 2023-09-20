import { useEffect } from "react";
import { getTimer, setTimer, useTimerDispatch } from "../context/GameContexts/TimerContext";
import { giveRandomMove } from "../Utils/Utils";
import { getThreeTilesSquares } from "../context/GameContexts/ThreeTilesSquareContext";
import { getPlayingSettings } from "../context/PlaySettingsContext";
import { getFourTilesSquares } from "../context/GameContexts/FourTilesSquareContext";
import { getFiveTilesSquares } from "../context/GameContexts/FiveTilesSquareContext";

function Timer({ makeMove }) {
  const [timer, dispatchTimer] = [getTimer(), useTimerDispatch()];
  const { timerValue, timerStatus, timerLength } = timer;
  const playingSettings = getPlayingSettings();
  const threeTilessquares = getThreeTilesSquares();
  const fourTilessquares = getFourTilesSquares();
  const fiveTilessquares = getFiveTilesSquares();
  useEffect(() => {
    let intervalId;
    if (timerValue !== null && timerStatus === "running" && timerValue < timerLength) {
      intervalId = setInterval(() => {
        const newTimerValue = timerValue + 1;
        setTimer(dispatchTimer, newTimerValue);
      }, 1000);
    } else if (timerValue >= timerLength) {
      setTimer(dispatchTimer, 0);
      let randomMove;
      playingSettings.tileCount === 3 && (randomMove = giveRandomMove(threeTilessquares));
      playingSettings.tileCount === 4 && (randomMove = giveRandomMove(fourTilessquares));
      playingSettings.tileCount === 5 && (randomMove = giveRandomMove(fiveTilessquares));
      makeMove(randomMove);
    }
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [timerStatus, timerValue]);

  return (
    <div>
      {timerStatus === "running" && (
        <>
          <h4>Timer</h4>
          <div>{`${timerValue} second`}</div>
          <hr style={{ marginBottom: "20px" }} />
        </>
      )}
    </div>
  );
}

export default Timer;
