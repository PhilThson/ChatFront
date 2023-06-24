import { useState, useCallback } from "react";
import loadingStatus from '../helpers/loadingStatus';

const useGetRequest = (url) => {
  const [loadingState, setLoadingState] = 
    useState(loadingStatus.isLoading);

  //z racji na to ze funkcja get jest parametrem do
  //hooka useEffect przy pobieraniu pokoi, to musi ona
  //pozostać niezmienna - funkcja jest zwyklym obiektem, 
  //przekazywanym przez wartosc, a nie przez referencje

  //rozwiazaniem jest uzycie hooka useCallback!
  //stad funkcja pozostanie niezmienna referencyjnie,
  //dopoki nie zostanie zmieniony adres Url
  const get = useCallback(async () => {
    setLoadingState(loadingStatus.isLoading);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      setLoadingState(loadingStatus.loaded);
      return result;
    } catch {
      setLoadingState(loadingStatus.hasError);
    }
  }, [url]);

  return { get, loadingState };
};

export default useGetRequest;