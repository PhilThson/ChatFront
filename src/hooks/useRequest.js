import { useState, useCallback, useContext } from "react";
import loadingStatusDict from "../helpers/loadingStatusDict";
import { UserDataContext } from "../context/UserDataContext";

const useRequest = () => {
  const { userData } = useContext(UserDataContext);
  const [loadingState, setLoadingState] = useState(loadingStatusDict.default);

  const request = useCallback(
    async (url, method, content) => {
      setLoadingState(loadingStatusDict.isLoading);
      try {
        const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
        };
        if (userData?.jwtToken) {
          headers.Authorization = `Bearer ${userData?.jwtToken}`;
        }
        if (!method) {
          method = "GET";
        }
        let body = null;
        if (content) {
          body = JSON.stringify(content);
        }

        const response = await fetch(url, {
          method: method,
          headers: headers,
          body: body,
        });

        if (response.status >= 400 && response.status < 600) {
          let errorMessage = "An error occurred";
          if (response.status === 400) {
            errorMessage = "Bad request";
          } else if (response.status === 401) {
            errorMessage = "Unauthorized";
          } else if (response.status === 500) {
            errorMessage = "Server error";
          }

          throw new Error(errorMessage);
        }

        const result = await response.json();
        setLoadingState(loadingStatusDict.loaded);
        return result;
      } catch (error) {
        setLoadingState(loadingStatusDict.hasError);
        throw error;
      }
    },
    [userData?.jwtToken]
  );

  return { request, loadingState };
};

export default useRequest;
