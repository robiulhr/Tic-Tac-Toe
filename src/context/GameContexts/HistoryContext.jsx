import { useContext, createContext, useReducer } from "react";

const HistoriesContext = createContext(null);
const HistoriesDispatchContext = createContext(null);
const initialHistory = [];

const historyReducer = (histories, action) => {
  if (!action) throw Error("Please, provide the reducer action");
  const { type, newHistoryObj, timeTravelState } = action;
  switch (type) {
    case "add":
      return timeTravelState !== null && typeof timeTravelState == "number"
        ? [...histories.slice(0, timeTravelState + 1), newHistoryObj]
        : [...histories, newHistoryObj];
    case "erase":
      return [];
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export default function HistoryProvider({ children }) {
  const [histories, dispatchHistories] = useReducer(
    historyReducer,
    initialHistory
  );
  return (
    <HistoriesContext.Provider value={histories}>
      <HistoriesDispatchContext.Provider value={dispatchHistories}>
        {children}
      </HistoriesDispatchContext.Provider>
    </HistoriesContext.Provider>
  );
}

export function useHistoriesContext() {
  return useContext(HistoriesContext);
}

export function useHistoriesDispatchContext() {
  return useContext(HistoriesDispatchContext);
}
