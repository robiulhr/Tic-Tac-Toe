import { useContext, createContext, useReducer } from "react";
import initialPlayingSettings from "../initialValue/PlayingSettingsInitialValue";
import playingSettingsReducer from "../reducer/PlayingSettingsReducer";
const PlayingSettingsContext = createContext(null);

function PlayingSettingsProvider({ children }) {
  const [playingSettings, dispatchPlayingSettings] = useReducer(playingSettingsReducer, initialPlayingSettings);
  return <PlayingSettingsContext.Provider value={{ playingSettings, dispatchPlayingSettings }}>{children}</PlayingSettingsContext.Provider>;
}
// get context functions
const getPlayingSettingsContext = () => {
  const { playingSettings, dispatchPlayingSettings } = useContext(PlayingSettingsContext);
  if (playingSettings === undefined || dispatchPlayingSettings === undefined) throw Error("getgetPlayingSettingsContextHistoryContext must be used within a context Provider");
  return {playingSettings, dispatchPlayingSettings};
};

export default PlayingSettingsProvider;
export { getPlayingSettingsContext };
