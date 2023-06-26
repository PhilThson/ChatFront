import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../settings/constants';
import { UserDataContext } from '../context/UserDataContext';

const Login = () => {
  const initValue = {
    username: '',
    password: ''
  };

  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState(initValue);
  const { setUserContext } = useContext(UserDataContext);

  const onChange = (e) => {
    e.preventDefault();
    setUserCreds({ ...userCreds, [e.target.id]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API_URL}user/authenticate`, {
        Username: userCreds.username,
        Password: userCreds.password
      });
      const { jwtToken, refreshToken } = response.data;
      setUserContext({ 
        name: userCreds.username,
        jwtToken: jwtToken,
        refreshToken: refreshToken
      });
      navigate('/rooms');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className='mt-3 mb-3'>
        <div className='row'>
          <div className='col-3'>
            <label className='form-label'>Name:</label>
            <input
              id='username'
              type="text"
              className='form-control'
              placeholder="Username"
              value={userCreds.username}
              onChange={onChange}
              required
            />
          </div>
        </div>
      </div>
      <div className='mb-3'>
        <div className='row'>
          <div className='col-3'>
            <label className='form-label'>Password:</label>
            <input
              id='password'
              type="password"
              className='form-control'
              placeholder="Password"
              value={userCreds.password}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <button 
        type="submit"
        className='btn btn-primary'>
          Login
      </button>
    </form>
  );
};

export default Login;