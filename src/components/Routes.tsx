import { createBrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Home from "./home/Home";
import Chat from "./Chat/Chat";
import Profile from "./profile/Profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/chats/:_id",
    element: <Chat />
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

export default router;
