import "./App.css";
import SingleDeviceMultiPlayer from "./pages/SingleDeviceMultiPlayer";
// import PlayWithComputer from "./pages/PlayWithComputer";
// import PlayWithAFriend from "./pages/PlayWithAFriend";
import PlayingLevel from "./pages/PlayingLevel";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChoosePlayTilesCount from "./pages/ChoosePlayTilesCount";
import PlayingSettingsProvider from "./context/PlaySettingsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/singledevicemultiplayer",
    element: <SingleDeviceMultiPlayer />,
  },
  // {
  //   path: "/playwithcomputer",
  //   element: <PlayWithComputer />,
  // },
  // {
  //   path: "/playwithfriend",
  //   element: <PlayWithAFriend />,
  // },
  {
    path: "/chooseplaytilescount",
    element: <ChoosePlayTilesCount />,
  },
  // {
  //   path: "/chooseplayinglevel",
  //   element: <PlayingLevel />,
  // },
]);

function App() {
  return (
    <div className="App">
      <PlayingSettingsProvider>
        <RouterProvider router={router} />
      </PlayingSettingsProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
