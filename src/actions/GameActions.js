import { boardReducer, historyReducer, timerReducer } from "../reducer/GameReducer";

// actions handlers for board context 
function setNextMove(dispatch, oldMove) {
    if (typeof dispatch !== "function")
        throw new Error(
            "setNextMove function expect a dispatch function as the first argument."
        );
    dispatch({ type: "next" });
    let upDatedMove = "old Move not provided";
    if (oldMove) {
        upDatedMove = boardReducer(oldMove, {
            type: "next"
        });
    }
    return upDatedMove;
}

const resetBoard = function (dispatch, tilesCount, oldBoard) {
    if (typeof dispatch !== "function") throw new Error("resetBoard function expect a dispatch function as the first argument.");
    dispatch({ type: "reset", tilesCount });
    let upDatedBoard = "Old Board not provided";
    if (oldBoard) {
        upDatedBoard = boardReducer(oldBoard, {
            type: "reset",
            tilesCount
        });
    }
    return upDatedBoard;
};

const setSquares = function (dispatch, squareIndex, currentMove, oldBoard) {
    if (typeof dispatch !== "function") throw new Error("setSquares function expect a dispatch function as the first argument.");
    dispatch({ type: "set", squareIndex, currentMove });
    let upDatedBoard = "Old Board not provided";
    if (oldBoard) {
        upDatedBoard = boardReducer(oldBoard, {
            type: "set",
            squareIndex,
            currentMove
        });
    }
    return upDatedBoard;
};


const setSquaresForTimetravel = function (dispatch, historyObj, oldBoard) {
    if (typeof dispatch !== "function") throw new Error("setSquaresForTimetravel function expect a dispatch function as the first argument.");
    const { currentMove, squares } = historyObj
    console.log(historyObj)
    dispatch({ type: "timeTravel", squares, currentMove });
    let upDatedBoard = "Old Board not provided";
    if (oldBoard) {
        upDatedBoard = boardReducer(oldBoard, {
            type: "timeTravel",
            squares,
            currentMove
        });
    }
    return upDatedBoard;
};




// actions handlers for history context 
const addHistories = function (dispatch, newHistoryObj, newTimeTravelState, oldHistory) {
    if (typeof dispatch !== "function") throw new Error("addHistories function expect a dispatch function as the first argument.");
    dispatch({ type: "add", newHistoryObj, newTimeTravelState });
    let upDatedHistory = "Old History not provided";
    if (oldHistory) {
        upDatedHistory = historyReducer(oldHistory, {
            type: "add",
            newHistoryObj,
            newTimeTravelState,
        });
    }
    return upDatedHistory;
};

const eraseHistories = function (dispatch, oldHistory) {
    if (typeof dispatch !== "function") throw new Error("eraseHistories function expect a dispatch function as the first argument.");
    dispatch({ type: "erase" });
    let upDatedHistory = "Old History not provided";
    if (oldHistory) {
        upDatedHistory = historyReducer(oldHistory, {
            type: "erase",
        });
    }
    return upDatedHistory;
};


function setTimeTravelState(dispatch, newTimeTravelState, oldHistory) {
    if (typeof dispatch !== "function") throw new Error("setTimeTravelState function expect a dispatch function as the first argument.");
    dispatch({ type: "setTimeTravelState", newTimeTravelState });
    let upDatedHistory = "Old History not provided";
    if (oldHistory) {
        upDatedHistory = historyReducer(oldHistory, {
            type: "setTimeTravelState",
            newTimeTravelState,
        });
    }
    return upDatedHistory;
}

// actions handlers for timer context 
const startTimer = function (dispatch, oldTimer) {
    if (typeof dispatch !== "function") throw new Error("startTimer function expect a dispatch function as the first argument.");
    dispatch({ type: "start" });
    let upDatedTimer = "Old Timer not provided";
    if (oldTimer) {
        upDatedTimer = timerReducer(oldTimer, {
            type: "start",
        });
    }
    return upDatedTimer;
};

const pauseTimer = function (dispatch, oldTimer) {
    if (typeof dispatch !== "function") throw new Error("pauseTimer function expect a dispatch function as the first argument.");
    dispatch({ type: "pause" });
    let upDatedTimer = "Old Timer not provided";
    if (oldTimer) {
        upDatedTimer = timerReducer(oldTimer, {
            type: "pause",
        });
    }
    return upDatedTimer;
};

const stopTimer = function (dispatch, oldTimer) {
    if (typeof dispatch !== "function") throw new Error("stopTimer function expect a dispatch function as the first argument.");
    dispatch({ type: "stop" });
    let upDatedTimer = "Old Timer not provided";
    if (oldTimer) {
        upDatedTimer = timerReducer(oldTimer, {
            type: "stop",
        });
    }
    return upDatedTimer;
};

const setTimer = function (dispatch, newValue, oldTimer) {
    if (typeof dispatch !== "function") throw new Error("setTimer function expect a dispatch function as the first argument.");
    dispatch({ type: "set", timerValue: newValue });
    let upDatedTimer = "Old Timer not provided";
    if (oldTimer) {
        upDatedTimer = timerReducer(oldTimer, {
            type: "set",
            timerValue: newValue,
        });
    }
    return upDatedTimer;
};

const setTimerLength = function (dispatch, timerLength, oldTimer) {
    if (typeof dispatch !== "function") throw new Error("setTimerLength function expect a dispatch function as the first argument.");
    dispatch({ type: "setTimerLength", timerLength: timerLength });
    let upDatedTimer = "Old Timer not provided";
    if (oldTimer) {
        upDatedTimer = timerReducer(oldTimer, {
            type: "setTimerLength",
            timerLength: timerLength,
        });
    }
    return upDatedTimer;
};

const setTimerId = function (dispatch, timerId, oldTimer) {
    if (typeof dispatch !== "function") throw new Error("setTimerId function expect a dispatch function as the first argument.");
    dispatch({ type: "setTimerId", timerId });
    let upDatedTimer = "Old Timer not provided";
    if (oldTimer) {
        upDatedTimer = timerReducer(oldTimer, {
            type: "setTimerId",
            timerId,
        });
    }
    return upDatedTimer;
};

const setTimerEnabled = (dispatch, timerEnabled, oldTimer) => {
    if (typeof dispatch !== "function") throw new Error("setTimerEnabled function expect a dispatch function as the first argument.");
    dispatch({ type: "setTimerEnabled", timerEnabled });
    let upDatedTimer = "Old Timer not provided";
    if (oldTimer) {
        upDatedTimer = timerReducer(oldTimer, {
            type: "setTimerEnabled",
            timerEnabled,
        });
    }
    return upDatedTimer;
};


// actions handlers for winner context 

function setWinner(dispatch, winner, oldWinnerState) {
    if (typeof dispatch !== "function") throw new Error("setWinner function expect a dispatch function as the first argument.");
    dispatch({ type: "set", winner });
    let upDatedWinner = "Old winner State not provided";
    if (oldWinnerState) {
        upDatedWinner = timeTravelStateReducer(oldWinnerState, {
            type: "set",
            oldWinnerState,
        });
    }
    return upDatedWinner;
}

function resetWinner(dispatch, oldWinnerState) {
    if (typeof dispatch !== "function") throw new Error("resetWinner function expect a dispatch function as the first argument.");
    dispatch({ type: "reset" });
    let upDatedWinner = "Old Winner State not provided";
    if (oldWinnerState) {
        upDatedWinner = timeTravelStateReducer(oldWinnerState, {
            type: "set",
        });
    }
    return upDatedWinner;
}

export { setNextMove, setSquares, resetBoard, setSquaresForTimetravel, addHistories, eraseHistories, setTimeTravelState, startTimer, pauseTimer, stopTimer, setTimer, setTimerLength, setTimerId, setTimerEnabled, setWinner, resetWinner }