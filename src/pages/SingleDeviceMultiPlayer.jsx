import Game from "../components/Game";
import GameProvider from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SingleDeviceMultiPlayer() {
  // const {playingSettings} = getPlayingSettingsContext();
  // if (!playingSettings.playingType) return <Navigate to="/" replace={true} />;
  // else if (!playingSettings.tileCount) return <Navigate to="/chooseplaytilescount" replace={true} />;
  // else if (!playingSettings.playingLevel) return <Navigate to="/chooseplayinglevel" replace={true} />;
  // const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {
  //   console.log("showAlert value", showAlert);
  //   const beforeunloadHandler = function (e) {
  //     if (showAlert) {
  //       console.log("hello world", showAlert);
  //       e.preventDefault();
  //       console.log(e);
  //       e.returnValue = "";
  //     }
  //   };
  //   window.addEventListener("beforeunload", beforeunloadHandler);
  //   return () => {
  //     console.log("hello world from return of beforeunload");
  //     window.removeEventListener("beforeunload", beforeunloadHandler);
  //   };
  // }, [showAlert]);

  // useEffect(() => {
  //   setShowAlert(true);
  // }, []);

  return (
    <div>
      {/* <GameProvider> */}
      <Game />
      {/* </GameProvider> */}
    </div>
  );
}

export default SingleDeviceMultiPlayer;
