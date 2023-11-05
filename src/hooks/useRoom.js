import { useState, useEffect } from "react";
import { BASE_CHATAPI_URL } from "../settings/constants";
import useRequest from "../hooks/useRequest";

const useRoom = (roomId) => {
  const [room, setRoom] = useState();
  const { request, loadingState } = useRequest();

  useEffect(() => {
    console.log("Inside use room, " + roomId);
    const fetchRoom = async () => {
      const roomData = await request(
        `${BASE_CHATAPI_URL}room/${parseInt(roomId)}`,
        "GET"
      );
      setRoom(roomData);
    };
    fetchRoom();
  }, [request, roomId]);

  return { room, loadingState };
};

export default useRoom;
