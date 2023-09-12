import "./App.css";
import PlayAlone from './pages/PlayAlone'
import PlayWithComputer from './pages/PlayWithComputer'
import PlayWithAFriend from './pages/PlayWithAFriend'
import Home from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChoosePlayTilesCount from "./pages/ChoosePlayTilesCount";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/playalone",
    element: <PlayAlone />,
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
    path:"/chooseplaytilescount",
    element:<ChoosePlayTilesCount/>
  }
]);



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
