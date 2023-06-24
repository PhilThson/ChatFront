import { useState, useEffect } from "react";
import { BASE_API_URL } from '../settings/constants';
import useGetRequest from '../hooks/useGetRequest';

const useRooms = () =>
{
  const [allRooms, setRooms] = useState([]);
  const { get, loadingState } = useGetRequest(`${BASE_API_URL}room`);

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await get();
      setRooms(rooms);
    };
    fetchRooms();
  }, [get]);

  return { allRooms, loadingState };
}

export default useRooms;