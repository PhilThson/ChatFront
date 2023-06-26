import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from '../components/Login';
import ChatRoom from '../components/ChatRoom';
import Rooms from '../components/Rooms'
import Header from './Header';
import { UserProvider } from '../context/UserDataContext';

const App = () => {
  return (
    <div className="container">
      <UserProvider>
        <Header subtitle="Chat application" />
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/rooms/{id}" element={<ChatRoom />} />
          <Route exact path="/rooms" element={<Rooms />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
