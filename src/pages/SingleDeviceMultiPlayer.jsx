import Game from "../components/Game";
import GameProvider from "../context/GameContext";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useBeforeUnload } from "react-router-dom";

function SingleDeviceMultiPlayer() {
  const [count, setCount] = useState(0);
  const [shouldUnload, setShouldUnload] = useState(false);

  useEffect(() => {
    setShouldUnload(true);
  }, []);
  // useBeforeUnload(
  //   useCallback((e) => {
  //     e.preventDefault();
  //     console.log("Are you sure you want to leave this page?");
  //     // Prompt a confirmation message when the user tries to leave the route
  //     e.returnValue = "Are you sure you want to leave this page?";
  //   })
  // );
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
