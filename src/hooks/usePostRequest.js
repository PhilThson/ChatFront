import { useState, useCallback, useContext } from "react";
import loadingStatusDict from '../helpers/loadingStatusDict';
import { UserDataContext } from '../context/UserDataContext';

const usePostRequest = (url) => {
  const { userData } = useContext(UserDataContext);
  const [loadingState, setLoadingState] = 
    useState(loadingStatusDict.default);

  const post = useCallback(async (content) => {
    setLoadingState(loadingStatusDict.isLoading);
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (userData?.jwtToken) {
        headers.Authorization = `Bearer ${userData.jwtToken}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(content)
      });
      const result = await response.json();
      setLoadingState(loadingStatusDict.loaded);
      return result;
    } catch (error) {
      setLoadingState(loadingStatusDict.hasError);
      throw error;
    }
  }, [url, userData]);

  return { post, loadingState };
};

export default usePostRequest;