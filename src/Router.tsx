import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Home from "./screens/home/Home";
import History from "./screens/history/History";
import Rank from "./screens/rank/Rank";
import Search from "./screens/search/Search";
import DetailBook from "./screens/book/DetailBook";
import PopularBook from "./screens/book/PopularBook";
import LatestBook from "./screens/book/LatestBook";
import FavorBook from "./screens/book/FavorBook";
import Quiz from "./screens/quiz/Quiz";
import Profile from "./screens/profile/Profile";
import CartoonMain from "./screens/cartoon/CartoonMain";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/quiz/*",
        element: <Quiz />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/history/*",
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
      {
        path: "/detailBook/:bookId",
        element: <DetailBook />,
      },
      {
        path: "/favorite",
        element: <FavorBook />,
      },
      {
        path: "/popular",
        element: <PopularBook />,
      },
      {
        path: "/latest",
        element: <LatestBook />,
      },
      {
        path: "/cartoon/:bookId",
        element: <CartoonMain />,
      },
    ],
  },
]);

export default router;
