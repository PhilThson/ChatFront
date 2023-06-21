import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../settings/constants';

const Login = ({ setUsername, setLoggedIn }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API_URL}user/authenticate`, {
        Username: usernameInput,
        Password: passwordInput
      });
      
      const { jwtToken, refreshToken } = response.data;

      localStorage.setItem('token', jwtToken);
      setUsername(usernameInput);
      setLoggedIn(true);
      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;