import { useContext } from 'react';
import { UserDataContext } from '../context/UserDataContext';

const useAuth = () => {
  return useContext(UserDataContext);
};

export default useAuth;