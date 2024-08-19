import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Home from "./screens/home/Home";
import History from "./screens/history/History";
import Rank from "./screens/rank/Rank";
import Search from "./screens/search/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/rank",
        element: <Rank />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
