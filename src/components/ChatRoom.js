import React, { useState, useEffect, useRef } from 'react';
import { BASE_HUB_URL } from '../settings/constants';
import useRooms from '../hooks/useRooms';
import { HubConnectionBuilder } from '@microsoft/signalr';
import loadingStatus from '../helpers/loadingStatus';
import LoadingIndicator from './loadingIndicator';

const ChatRoom = ({ username }) => {
  //bez podawania inicjalizatora w hooku useState,
  //zmienna przyjmie wartosc undefined
  const [roomId, setRoomId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { allRooms, loadingState } = useRooms();
  const hubConnectionRef = useRef(null);

  const addMessageToList = (receivedMessage) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  useEffect(() => {
    if (roomId) {
      const startHubConnection = async () => {
        hubConnectionRef.current = new HubConnectionBuilder()
          .withUrl(BASE_HUB_URL, { 
            accessTokenFactory: () => localStorage.getItem('token')
          })
          .withAutomaticReconnect()
          .build();
  
        await hubConnectionRef.current.start();
  
        hubConnectionRef.current.on('ReceiveMessage', (newMsg) => addMessageToList(newMsg));
        hubConnectionRef.current.on('SystemMessage', (newMsg) => addMessageToList(newMsg));
      };
      startHubConnection();
    } else {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    }
  }, [roomId]);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const handleJoinRoom = (id) => {
    console.log("Joing choosen room...");
    setRoomId(id);
    // Connect to SignalR hub and join the selected room
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

      const newMessage = {
        //content: content,
        //username: user.name
        roomId: 1,
        message: message,
        username: username
      }

      // Send the message using SignalR
      hubConnectionRef.current.invoke('SendMessage', newMessage)
        .then(() => {
          setMessage('');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });

      hubConnectionRef.current.invoke('AuthorizedResource');
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
        <>
          <h4>Room {roomId}</h4>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className={
                `${msg.username.toLowerCase() === 'system' ? "fst-italic" : ""}`}>
                <strong>{msg.username}</strong>: {msg.message}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChatRoom;