import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL, BASE_HUB_URL } from '../settings/constants';
import useRooms from '../hooks/useRooms';
import { HubConnectionBuilder } from '@microsoft/signalr';

const ChatRoom = ({ username }) => {
  const [roomId, setRoomId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const allRooms = useRooms();

  const hubConnection = new HubConnectionBuilder()
    .withUrl(BASE_HUB_URL)
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    if (roomId) {
      // Start the SignalR connection
      hubConnection.start().catch((error) => console.error(error));

      // Listen for ReceiveMessage event
      hubConnection.on('ReceiveMessage', (receivedMessage) => {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    } else {
      // Room is not selected, stop the SignalR connection
      hubConnection.stop();
    }
  }, [roomId]);

  const handleJoinRoom = (id) => {
    console.log("Joing choosen room...");
    setRoomId(id);
    // Connect to SignalR hub and join the selected room
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_API_URL}message`,
        {
          roomId: roomId,
          message: message
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Expecting the response to be the newly sent message
      const { content, roomId, user } = response.data;;

      // Send the message using SignalR
      hubConnection.invoke('SendMessage', {
        content: content,
        roomId: roomId,
        username: user.name
      });

      const newMessage = {
        content: content,
        username: user.name
      }

      // Add the new message to the list of messages
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Send the message using SignalR
      hubConnection.invoke('SendMessage', newMessage);

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
        {allRooms.map((room) => (
            <li key={room.id} onClick={() => handleJoinRoom(room.id)}>
              {room.name}
            </li>
          ))}
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