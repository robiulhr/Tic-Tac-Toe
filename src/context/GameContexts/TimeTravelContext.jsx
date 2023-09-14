import { useContext, useState, createContext } from "react";

const TimeTravelContext = createContext(null);
const TimeTravelStateDispatchContext = createContext(null);

export default function TimeTravelProvider({ children }) {
  const [timeTravelState, dispatchTimeTravelState] = useState(null);
  return (
    <TimeTravelContext.Provider value={timeTravelState}>
      <TimeTravelStateDispatchContext.Provider value={dispatchTimeTravelState}>
        {children}
      </TimeTravelStateDispatchContext.Provider>
    </TimeTravelContext.Provider>
  );
}

export function useTimeTravelContext() {
  return useContext(TimeTravelContext);
}

export function useTimeTravelStateDispatchContext() {
  return useContext(TimeTravelStateDispatchContext);
}
