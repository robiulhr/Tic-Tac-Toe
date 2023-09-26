import initialPlayingSettings from "../initialValue/PlayingSettingsInitialValue";
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

export default playingSettingsReducer