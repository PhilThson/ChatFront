import { useState, useCallback, useContext } from "react";
import loadingStatusDict from '../helpers/loadingStatusDict';
import { UserDataContext } from '../context/UserDataContext';

const useGetRequest = (url) => {
  const { userData } = useContext(UserDataContext);
  const [loadingState, setLoadingState] = 
    useState(loadingStatusDict.isLoading);

  const get = useCallback(async () => {
    setLoadingState(loadingStatusDict.isLoading);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`
        }
      });
      const result = await response.json();
      setLoadingState(loadingStatusDict.loaded);
      return result;
    } catch {
      setLoadingState(loadingStatusDict.hasError);
    }
  }, [url]);

  return { get, loadingState };
};

export default useGetRequest;