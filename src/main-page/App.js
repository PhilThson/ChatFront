import './App.css';
import React, { useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from '../components/Login';
import ChatRoom from '../components/ChatRoom';
import Header from './Header';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="container">
      <Header subtitle="Chat application" />
      <Routes>
        <Route path="/login" 
          element={
          <Login setUsername={setUsername} setLoggedIn={setLoggedIn} />} />
        <Route
          path="/"
          element={loggedIn 
            ? <ChatRoom username={username} /> 
            : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
