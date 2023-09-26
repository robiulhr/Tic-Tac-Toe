
const initialBoard = {
    squares: [],
    nextMove: 0,
};

const initailHistory = {
    histories: [],
    timeTravelState: null,
};

const initialTimer = {
    timerEnabled: true,
    timerId: null,
    timerStatus: "stoped",
    timerValue: 0,
    timerLength: "10",
};

const initialWinner = null;

export { initialBoard, initailHistory, initialTimer, initialWinner }
