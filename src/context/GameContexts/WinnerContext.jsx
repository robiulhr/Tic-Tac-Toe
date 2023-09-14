import { useContext, useState, createContext } from "react";

const WinnerContext = createContext(null);
const WinnerDispatchContext = createContext(null);

export default function WinnerProvider({ children }) {
  const [winner, dispatchWinner] = useState(null);
  return (
    <WinnerContext.Provider value={winner}>
      <WinnerDispatchContext.Provider value={dispatchWinner}>
        {children}
      </WinnerDispatchContext.Provider>
    </WinnerContext.Provider>
  );
}

export function useWinnerContext() {
  return useContext(WinnerContext);
}

export function useWinnerDispatchContext() {
  return useContext(WinnerDispatchContext);
}
