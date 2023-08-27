import { useState, useEffect } from "react";
import { BASE_AUTH_URL } from "../settings/constants";
import useRequest from "./useRequest";

const useUsers = (userIds) => {
  const [users, setRoomUsers] = useState([]);
  const { request, loadingState } = useRequest(
    `${BASE_AUTH_URL}/users?ids=${userIds}`
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await request();
      setRoomUsers(users);
    };
    fetchUsers();
  }, [request]);

  return { users, loadingState };
};

export default useUsers;
