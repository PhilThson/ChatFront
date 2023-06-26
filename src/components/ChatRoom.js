import React, { useState, useEffect, useRef, useContext, useParams } from 'react';
import { BASE_HUB_URL } from '../settings/constants';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { UserDataContext } from '../context/UserDataContext';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { userData } = useContext(UserDataContext);
  const { id } = useParams();
  const hubConnectionRef = useRef(null);

  const addMessageToList = (receivedMessage) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  useEffect(() => {
    if (id) {
      const startHubConnection = async () => {
        hubConnectionRef.current = new HubConnectionBuilder()
          .withUrl(BASE_HUB_URL, { 
            accessTokenFactory: () => userData.jwtToken
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
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

      const newMessage = {
        //content: content,
        //username: user.name
        roomId: 1,
        message: message,
        username: userData.name
      }
      
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
      <h2>Welcome, {userData.name}!</h2>
      {id && (
        <>
          <h4>Room {id}</h4>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <ul className='list-group'>
            {messages.map((msg, index) => (
              <li key={index} className={
                `${msg.username.toLowerCase() === 'system' 
                ? "fst-italic" : ""}`}>
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