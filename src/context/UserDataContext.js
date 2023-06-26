import React, { createContext, useState } from 'react';

export const UserDataContext = createContext({
  name: 'Guest',
  jwtToken: '',
  refreshToken: ''
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const setUserContext = (data) => {
    setUserData(data);
  };

  const value = {
    userData,
    setUserContext,
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};