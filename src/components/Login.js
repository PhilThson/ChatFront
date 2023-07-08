import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { BASE_API_URL } from '../settings/constants';
import WarningMessage from '../utils/WarningMessage';
import usePostRequest from '../hooks/usePostRequest';
import LoadingIndicator from '../utils/LoadingIndicator';
import loadingStatusDict from '../helpers/loadingStatusDict';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const [userCreds, setUserCreds] = useState({ username:'', password:''});
  const [alertMessage, setAlertMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState('');
  
  const { setUserContext } = useAuth();
  const { post, loadingState } = usePostRequest(`${BASE_API_URL}user/authenticate`);

  useEffect(() => {
    const alert = searchParams.get('alert');
    if (alert) {
      setAlertMessage("Proszę się zalogować");
    }
  }, [searchParams, setAlertMessage]);

  // useEffect(() => {
  //   setErrorMsg('');
  // }, userCreds);

  const onChange = (e) => {
    e.preventDefault();
    setUserCreds({ ...userCreds, [e.target.id]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { jwtToken, refreshToken } = await post(userCreds);
      setUserContext({ 
        name: userCreds.username,
        jwtToken: jwtToken,
        refreshToken: refreshToken
      });
      //przekierowanie uzytkownika do strony z której przyszedł
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      //setErrorMsg(error);
    }
  };

  return (
    <>
      {alertMessage && <WarningMessage message={alertMessage} />}
      {loadingState === loadingStatusDict.isLoading && <LoadingIndicator />}
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
    </>
  );
};

export default Login;