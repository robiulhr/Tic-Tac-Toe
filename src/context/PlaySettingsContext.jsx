import { useContext, createContext, useReducer } from "react";

const PlayingSettingsContext = createContext(null);
const PlayingSettingsDispatchContext = createContext(null);

const initialPlayingSettings = {
  tileCount: null,
  playingLevel: null,
  playingType: null,
};
const playingSettingsReducer = (playingSettings, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, tileCount, playingLevel, playingType, resetExceptThese } = action;
  switch (type) {
    case "setTileCount":
      return { ...playingSettings, tileCount: tileCount };
    case "setPlayingLevel":
      return { ...playingSettings, playingLevel: playingLevel };
    case "setPlayingType":
      return { ...playingSettings, playingType: playingType };
    case "reset":
      if (resetExceptThese) {
        return { ...initialPlayingSettings, ...resetExceptThese };
      }
      return { ...initialPlayingSettings };
    default:
      throw Error("Unknown action: " + type);
  }
};

function PlayingSettingsProvider({ children }) {
  const [playingSettings, dispatchPlayingSettings] = useReducer(playingSettingsReducer, initialPlayingSettings);
  return (
    <PlayingSettingsContext.Provider value={playingSettings}>
      <PlayingSettingsDispatchContext.Provider value={dispatchPlayingSettings}>{children}</PlayingSettingsDispatchContext.Provider>
    </PlayingSettingsContext.Provider>
  );
}

const getPlayingSettings = () => {
  return useContext(PlayingSettingsContext);
};

function usePlayingSettingsDispatch() {
  const dispatchPlayingSettings = useContext(PlayingSettingsDispatchContext);
  if (dispatchPlayingSettings === undefined) {
    throw new Error("usePlayingSettingsDispatch must be used within a context Provider");
  }
  return dispatchPlayingSettings;
}

const setTileCount = (dispatch, tileCount, oldPlayingSettings) => {
  if (typeof dispatch !== "function") throw new Error("setTileCount function expect a dispatch function as the first argument.");
  dispatch({ type: "setTileCount", tileCount });
  let upDatedPlayingSettings = "old PlayingSettings not provided";
  if (oldPlayingSettings) {
    upDatedPlayingSettings = playingSettingsReducer(oldPlayingSettings, {
      type: "setTileCount",
      tileCount,
    });
  }
  return upDatedPlayingSettings;
};

const setPlayingType = (dispatch, playingType, oldPlayingSettings) => {
  if (typeof dispatch !== "function") throw new Error("setPlayingType function expect a dispatch function as the first argument.");
  dispatch({ type: "setPlayingType", playingType });
  let upDatedPlayingSettings = "old PlayingSettings not provided";
  if (oldPlayingSettings) {
    upDatedPlayingSettings = playingSettingsReducer(oldPlayingSettings, {
      type: "setPlayingType",
      playingType,
    });
  }
  return upDatedPlayingSettings;
};

const setPlayingLevel = (dispatch, playingLevel, oldPlayingSettings) => {
  if (typeof dispatch !== "function") throw new Error("setPlayingLevel function expect a dispatch function as the first argument.");
  dispatch({ type: "setPlayingLevel", playingLevel });
  let upDatedPlayingSettings = "old PlayingSettings not provided";
  if (oldPlayingSettings) {
    upDatedPlayingSettings = playingSettingsReducer(oldPlayingSettings, {
      type: "setPlayingLevel",
      playingLevel,
    });
  }
  return upDatedPlayingSettings;
};

const resetPlayingSettings = function (dispatch, resetExceptThese, oldPlayingSettings) {
  if (typeof dispatch !== "function") throw new Error("resetPlayingSettings function expect a dispatch function as the first argument.");
  let isResetExceptTheseAvailable = false;
  if (typeof resetExceptThese === "object" && typeof oldPlayingSettings === "object") isResetExceptTheseAvailable = true;
  let upDatedPlayingSettings = "old PlayingSettings not provided";
  if (!isResetExceptTheseAvailable) {
    oldPlayingSettings = resetExceptThese;
    resetExceptThese = undefined;
  }
  dispatch({ type: "reset", resetExceptThese });
  if (oldPlayingSettings) {
    upDatedPlayingSettings = playingSettingsReducer(oldPlayingSettings, {
      type: "reset",
      resetExceptThese,
    });
  }
  return upDatedPlayingSettings;
};

export default PlayingSettingsProvider;
export { getPlayingSettings, usePlayingSettingsDispatch, setTileCount, setPlayingType, setPlayingLevel, resetPlayingSettings };
