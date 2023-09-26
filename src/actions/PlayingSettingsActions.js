import playingSettingsReducer from "../reducer/PlayingSettingsReducer";

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

export { setTileCount, setPlayingType, setPlayingLevel, resetPlayingSettings };
