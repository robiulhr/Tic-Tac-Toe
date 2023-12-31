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
import SocialLinks from "./components/socialLinks";
const router = createBrowserRouter(
  [
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
  ],
  { basename: import.meta.env.BASE_URL }
);

function App() {
  return (
    <div className="App">
      <PlayingSettingsProvider>
        <SocialLinks />
        <RouterProvider router={router} />
      </PlayingSettingsProvider>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
