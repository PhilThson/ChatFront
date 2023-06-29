import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext';

// Higher-order component
const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const { userData } = useContext(UserDataContext);

    if (!userData) {
      return <Navigate to="/login?alert=unauthorized" />;
    }
    
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;