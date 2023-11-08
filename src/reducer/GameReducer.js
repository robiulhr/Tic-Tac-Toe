const boardReducer = (board, action) => {
    if (!action) throw Error("Please, provide the reducer action");
    const { squares, nextMove } = board
    const { type, squareIndex, squares: historySqures, tilesCount, currentMove } = action;
    switch (type) {
        case "reset":
            switch (tilesCount) {
                case undefined:
                    throw Error("Please provide tiles count to reset the board");
                case 3:
                    return { nextMove: 0, squares: new Array(9).fill(null) };
                case 4:
                    return { nextMove: 0, squares: new Array(16).fill(null) };;
                case 5:
                    return { nextMove: 0, squares: new Array(25).fill(null) };;
            }
        case "set":
            if (typeof squareIndex !== 'number' || typeof currentMove !== 'number') throw Error("please provide the squareIndex and currentMove to set square.")
            // set the given move to the board
            const changedElement = currentMove === 0 ? "O" : "x";
            return { ...board, squares: [...squares.slice(0, squareIndex), changedElement, ...squares.slice(squareIndex + 1)] };
        case "timeTravel":
            if (!historySqures || typeof currentMove !== "number") throw Error("please provide the historySqures and historyMove to timeTravel.")
            const updatedNextMove = currentMove === 0 ? 1 : 0;
            return { ...board, squares: historySqures, nextMove: updatedNextMove };
        case "next":
            return { ...board, nextMove: nextMove === 0 ? 1 : 0 };
        default:
            throw Error("Unknown action: " + type);
    }
};



const historyReducer = (history, action) => {
    if (!action) throw Error("Please, provide the reducer action");
    const { timeTravelState, histories } = history
    const { type, newHistoryObj, newTimeTravelState } = action;
    switch (type) {
        case "add":
            return typeof newTimeTravelState === "number" ? { ...history, histories: [...histories.slice(0, newTimeTravelState + 1), newHistoryObj] } : { ...history, histories: [...histories, newHistoryObj] };
        case "erase":
            return {
                histories: [],
                timeTravelState: null,
            };
        case "setTimeTravelState":
            if (!newTimeTravelState && typeof newTimeTravelState !== "number" && newTimeTravelState !== null) throw Error("please, provide the value of timeTravelState to set TimeTravelState")
            return {
                ...history,
                timeTravelState: newTimeTravelState
            }
        default:
            throw Error("Unknown action: " + action.type);
    }
};

const timerReducer = (timer, action) => {
    if (!action) throw Error("Please, provide the reducer action");
    const { type, timerValue, timerLength, timerId, timerEnabled } = action;
    switch (type) {
        case "start":
            return { ...timer, timerStatus: "running" };
        case "pause":
            return { ...timer, timerStatus: "paused" };
        case "stop":
            return { ...timer, timerValue: 0, timerStatus: "stoped" };
        case "set":
            return { ...timer, timerValue: timerValue };
        case "setTimerLength":
            return { ...timer, timerLength: timerLength };
        case "setTimerId":
            return { ...timer, timerId: timerId };
        case "setTimerEnabled":
            return { ...timer, timerEnabled: timerEnabled };
        default:
            throw Error("Unknown action: " + type);
    }
};

const winnerReducer = (winnerState, action) => {
    if (!action) throw Error("Please, provide the reducer action");
    const { type, winner } = action;
    switch (type) {
        case "set":
            if (!winner) throw Error("please, provide the winner value to set the winner")
            return winner;
        case "reset":
            return null;
        default:
            throw Error("Unknown action: " + type);
    }
}

export { boardReducer, historyReducer, timerReducer, winnerReducer }