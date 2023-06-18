import React, { useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../settings/constants';
import useRooms from '../hooks/useRooms';

const ChatRoom = ({ username }) => {
  const [roomId, setRoomId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const allRooms = useRooms();

  const handleJoinRoom = (id) => {
    setRoomId(id);
    // Connect to SignalR hub and join the selected room
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API_URL}send-message`, {
        roomId: roomId,
        message: message
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Add the new message to the list of messages
      setMessages([...messages, response.data]);

      // Clear the message input field
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <h3>Select a chat room:</h3>
      <ul>
        {allRooms.map(id => (
            <li key={id} onClick={handleJoinRoom}></li>
          ))}
        {/* <li onClick={() => handleJoinRoom(1)}>Room 1</li>
        <li onClick={() => handleJoinRoom(2)}>Room 2</li>
        <li onClick={() => handleJoinRoom(3)}>Room 3</li> */}
      </ul>

      {roomId && (
        <div>
          <h4>Room {roomId}</h4>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.username}</strong>: {msg.message}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;