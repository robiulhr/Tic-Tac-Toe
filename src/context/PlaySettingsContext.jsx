import { useContext, createContext, useReducer } from "react";

const PlayingSettingsContext = createContext(null);
const PlayingSettingsDispatchContext = createContext(null);

const initialPlayingSettings = {
    tileCount: 3,
    playingLevel: 'beginner',
    playingType: 'dual'
};
const playingSettingsReducer = (squares, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type} = action;
  switch (type) {
    case "":
    
    default:
      throw Error("Unknown action: " + type);
  }
};

export default function PlayingSettingsProvider({ children }) {
  const [playingSettings, dispatchPlayingSettings] = useReducer(playingSettingsReducer, initialPlayingSettings);
  return (
    <PlayingSettingsContext.Provider value={playingSettings}>
      <PlayingSettingsDispatchContext.Provider value={dispatchPlayingSettings}>
        {children}
      </PlayingSettingsDispatchContext.Provider>
    </PlayingSettingsContext.Provider>
  );
}

export function usePlayingSettingsContext() {
  return useContext(PlayingSettingsContext);
}

export function usePlayingSettingsDispatchContext() {
  return useContext(PlayingSettingsDispatchContext);
}
