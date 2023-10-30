import React from "react";
import loadingStatusDict from "../helpers/loadingStatusDict";
import LoadingIndicator from "../utils/LoadingIndicator";
import useRooms from "../hooks/useRooms";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Rooms = () => {
  const { userData } = useAuth();
  const { allRooms, loadingState } = useRooms();

  if (loadingState !== loadingStatusDict.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  return (
    <>
      <h2>Select a chat room:</h2>
      <p>Logged in as: {userData?.email}</p>
      <ul className="list-group rooms">
        {allRooms.map((room) => (
          <li key={room.id} className="room-item">
            <Link to={room.id.toString()}>
              <h3>{room.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Rooms;
