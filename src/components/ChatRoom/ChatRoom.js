import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  BASE_HUB_URL,
  SEND_MESSAGE_EVENT,
  RECEIVE_MESSAGE_EVENT,
} from "../../settings/constants";
import { HubConnectionBuilder } from "@microsoft/signalr";
import useAuth from "../../hooks/useAuth";
import loadingStatusDict from "../../helpers/loadingStatusDict";
import LoadingIndicator from "../../utils/LoadingIndicator";
import ValidationMessage from "../../utils/WarningMessage";
import Messages from "../ChatRoom/Messages";
import Users from "../Users";
import useRoom from "../../hooks/useRoom";

const ChatRoom = () => {
  const { roomId } = useParams();
  const { room, loadingState } = useRoom(roomId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { userData } = useAuth();
  const hubConnectionRef = useRef(null);

  useEffect(() => {
    if (!isNaN(parseInt(roomId))) {
      const startHubConnection = async () => {
        hubConnectionRef.current = new HubConnectionBuilder()
          .withUrl(BASE_HUB_URL, {
            accessTokenFactory: () => userData.jwtToken,
          })
          .withAutomaticReconnect()
          .build();

        await hubConnectionRef.current.start();

        hubConnectionRef.current.on(SEND_MESSAGE_EVENT, (newMsg) =>
          addMessageToList(newMsg)
        );
        hubConnectionRef.current.on(RECEIVE_MESSAGE_EVENT, (newMsg) =>
          addMessageToList(newMsg)
        );
      };
      startHubConnection();
    } else {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    }
  }, [userData?.jwtToken, roomId]);

  if (isNaN(parseInt(roomId))) {
    return <ValidationMessage message={"Can't resolve room identifier"} />;
  }

  if (loadingState !== loadingStatusDict.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const addMessageToList = (receivedMessage) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      roomId: roomId,
      content: message,
      username: userData.name,
    };

    hubConnectionRef.current
      .invoke(SEND_MESSAGE_EVENT, newMessage)
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

    //hubConnectionRef.current.invoke("AuthorizedResource");
  };

  return (
    <div className="chatRoom">
      <h2>Welcome, {userData.name}!</h2>
      <h4>Room {roomId}</h4>
      <div className="row">
        <div className="column small-12 medium-6">
          <Messages
            messages={messages}
            users={users}
            participants={room.participants}
            roomMessages={room.messages}
            setMessages={setMessages}
          />
          <form onSubmit={handleSendMessage}>
            <div>
              <input
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="primaryButton" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="column small-12 medium-6">
          <Users
            users={users}
            participants={room.participants}
            setUsers={setUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
