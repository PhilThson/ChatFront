import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import ChatRoom from "../components/ChatRoom/ChatRoom";
import Rooms from "../components/Rooms";
import PageNotFound from "../components/PageNotFound";
import ProtectedRoute from "../utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "rooms", element: <Rooms /> },
          { path: "rooms/:roomId", element: <ChatRoom /> },
        ]
      }
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
