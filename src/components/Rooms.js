import React, { useContext } from 'react';
import loadingStatusDict from '../helpers/loadingStatusDict';
import LoadingIndicator from '../utils/LoadingIndicator';
import useRooms from '../hooks/useRooms';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext';

const Rooms = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const { allRooms, loadingState } = useRooms();

  if (loadingState !== loadingStatusDict.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const handleJoinRoom = (id) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <>
      <h3>Select a chat room:</h3>
      <p>Logged in as: {userData.name}</p>
      <ul className='list-group'>
        {allRooms.map((room) => (
            <button 
              className='list-group-item list-group-item-action'
              key={room.id} 
              onClick={() => handleJoinRoom(room.id)}>
                {room.name}
            </button>
          ))}
      </ul>
    </>
  );
};

export default Rooms;