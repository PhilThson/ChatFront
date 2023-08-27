import React, { useEffect } from "react";
import { BASE_AUTH_URL } from "../settings/constants";
import useRequest from "../hooks/useRequest";
import loadingStatusDict from "../helpers/loadingStatusDict";
import LoadingIndicator from "../utils/LoadingIndicator";

const Users = (props) => {
  const { request, loadingState } = useRequest();

  useEffect(() => {
    const fetchData = async () => {
      let userIds = props.participants.map((p) => p.userId).join(",");
      console.log("Room users ids: " + userIds);
      let uri = `${BASE_AUTH_URL}users`;
      if (userIds.length) {
        uri = uri + `?ids=${userIds}`;
      }
      let users = await request(uri);
      props.setUsers(users);
    };
    fetchData();
  }, [request]);

  if (loadingState !== loadingStatusDict.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  return (
    <article>
      <h3>Users List</h3>
      {props.users?.length ? (
        <ul>
          {props.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
