import { useState, useEffect } from "react";
import { BASE_API_URL } from '../settings/constants';
import axios from 'axios';

const useRooms = () =>
{
  const [allRooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}send-message`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const rooms = await response.json();
        setRooms(rooms);

      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  return allRooms;
}

export default useRooms;