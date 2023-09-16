import { useContext, createContext, useReducer } from "react";

const HistoriesContext = createContext(null);
const HistoriesDispatchContext = createContext(null);
const initialHistory = [];

const historyReducer = (histories, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, newHistoryObj, timeTravelState } = action;
  switch (type) {
    case "add":
      return timeTravelState !== null && typeof timeTravelState == "number" ? [...histories.slice(0, timeTravelState + 1), newHistoryObj] : [...histories, newHistoryObj];
    case "erase":
      return [];
    default:
      throw Error("Unknown action: " + action.type);
  }
};

function HistoryProvider({ children }) {
  const [histories, dispatchHistories] = useReducer(historyReducer, initialHistory);
  return (
    <HistoriesContext.Provider value={histories}>
      <HistoriesDispatchContext.Provider value={dispatchHistories}>{children}</HistoriesDispatchContext.Provider>
    </HistoriesContext.Provider>
  );
}

function useHistoriesDispatch() {
  const dispatchHistories = useContext(HistoriesDispatchContext);
  if (dispatchHistories === undefined) {
    throw new Error("useHistoriesDispatch must be used within a context Provider");
  }
  return dispatchHistories;
}

const getHistories = function () {
  return useContext(HistoriesContext);
};

const addHistories = function (dispatch, newHistoryObj, timeTravelState, oldHistories) {
  if (typeof dispatch !== "function") throw new Error("addHistories function expect a dispatch function as the first argument.");
  dispatch({ type: "add", newHistoryObj, timeTravelState });
  let upDatedHistories = "Old History not provided";
  if (oldHistories) {
    upDatedHistories = historyReducer(oldHistories, {
      type: "add",
      newHistoryObj,
      timeTravelState,
    });
  }
  return upDatedHistories;
};

const eraseHistories = function (dispatch, oldHistories) {
  if (typeof dispatch !== "function") throw new Error("eraseHistories function expect a dispatch function as the first argument.");
  dispatch({ type: "erase" });
  let upDatedHistories = "Old History not provided";
  if (oldHistories) {
    upDatedHistories = historyReducer(oldHistories, {
      type: "erase",
    });
  }
  return upDatedHistories;
};

export default HistoryProvider;
export { useHistoriesDispatch, getHistories, addHistories, eraseHistories };
