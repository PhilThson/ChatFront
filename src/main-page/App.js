// import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import ChatRoom from "../components/ChatRoom";
import Rooms from "../components/Rooms";
import Users from "../components/Users";
import PageNotFound from "../components/PageNotFound";
import ProtectedRoute from "../utils/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:roomId" element={<ChatRoom />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
