import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { USER_AUTHENTICATE, LOGIN_ALERT_MESSAGE } from "../settings/constants";
import WarningMessage from "../utils/WarningMessage";
import useRequest from "../hooks/useRequest";
import LoadingIndicator from "../utils/LoadingIndicator";
import loadingStatusDict from "../helpers/loadingStatusDict";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userCreds, setUserCreds] = useState({ email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [searchParams] = useSearchParams();

  const { setUserContext } = useAuth();
  const { request, loadingState } = useRequest();

  useEffect(() => {
    const alert = searchParams.get("alert");
    if (alert) {
      setAlertMessage(LOGIN_ALERT_MESSAGE);
    }
  }, [searchParams, setAlertMessage]);

  const onChange = (e) => {
    e.preventDefault();
    setUserCreds({ ...userCreds, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { jwtToken, refreshToken } = await request(
        USER_AUTHENTICATE,
        "POST",
        userCreds
      );
      setUserContext({
        email: userCreds.email,
        jwtToken: jwtToken,
        refreshToken: refreshToken,
      });
      console.log("User came from: " + from);
      //przekierowanie uzytkownika do strony z której przyszedł
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {alertMessage && <WarningMessage message={alertMessage} />}
      {loadingState === loadingStatusDict.isLoading && <LoadingIndicator />}
      <form onSubmit={handleLogin}>
        <div className="row">
          <div className="column small-12 medium-6">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              autoComplete="email"
              value={userCreds.email}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="column small-12 medium-6">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={userCreds.password}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="column small-12 medium-6">
            <button type="submit" className="primaryButton">
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
