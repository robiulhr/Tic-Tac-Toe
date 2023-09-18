import "./App.css";
import SingleDeviceMultiPlayer from "./pages/SingleDeviceMultiPlayer";
import PlayWithComputer from "./pages/PlayWithComputer";
import PlayWithAFriend from "./pages/PlayWithAFriend";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChoosePlayTilesCount from "./pages/ChoosePlayTilesCount";
import PlayingSettingsProvider from "./context/PlaySettingsContext";
import PlayerMoveProvider from "./context/GameContexts/PlayerMoveContext";
import TimeTravelProvider from "./context/GameContexts/TimeTravelContext";
import HistoryProvider from "./context/GameContexts/HistoryContext";
import TimerProvider from "./context/GameContexts/TimerContext";
import SquaresProvider from "./context/GameContexts/GameSquareContext";
import WinnerProvider from "./context/GameContexts/WinnerContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/singledevicemultiplayer",
    element: <SingleDeviceMultiPlayer />,
  },
  {
    path: "/playwithcomputer",
    element: <PlayWithComputer />,
  },
  {
    path: "/playwithfriend",
    element: <PlayWithAFriend />,
  },
  {
    path: "/chooseplaytilescount",
    element: <ChoosePlayTilesCount />,
  },
]);

function App() {
  return (
    <div className="App">
      <PlayingSettingsProvider>
        <PlayerMoveProvider>
          <TimeTravelProvider>
            <HistoryProvider>
              <TimerProvider>
                <WinnerProvider>
                  <SquaresProvider>
                    <RouterProvider router={router} />
                  </SquaresProvider>
                </WinnerProvider>
              </TimerProvider>
            </HistoryProvider>
          </TimeTravelProvider>
        </PlayerMoveProvider>
      </PlayingSettingsProvider>
    </div>
  );
}

export default App;
