import { useState, useEffect } from "react";
import { BASE_CHATAPI_URL } from "../settings/constants";
import useRequest from "../hooks/useRequest";

const useRooms = () => {
  const [allRooms, setRooms] = useState([]);
  const { request, loadingState } = useRequest();

  useEffect(() => {
    console.log("Inside useRooms");
    const fetchRooms = async () => {
      const rooms = await request(`${BASE_CHATAPI_URL}room`);
      console.log("Found " + rooms.length + " rooms");
      setRooms(rooms);
    };
    fetchRooms();
  }, [request]);

  return { allRooms, loadingState };
};

export default useRooms;
