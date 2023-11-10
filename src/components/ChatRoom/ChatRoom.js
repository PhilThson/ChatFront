import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { useParams } from "react-router-dom";
import {
  BASE_HUB_URL,
  SEND_MESSAGE_EVENT,
  RECEIVE_MESSAGE_EVENT,
  SYSTEM_MESSAGE_EVENT
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
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { userData } = useAuth();
  const hubConnectionRef = useRef(null);
  const messageRef = useRef("");

  const addMessageToList = useCallback((receivedMessage) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  }, [setMessages]);

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

        hubConnectionRef.current.on(RECEIVE_MESSAGE_EVENT, (receivedMsg) => {
          addMessageToList(receivedMsg);
        });

        hubConnectionRef.current.on(SYSTEM_MESSAGE_EVENT, (receivedMsg) => {
          addMessageToList(receivedMsg);
        });
      };
      startHubConnection();
    } else {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    }
  }, [userData?.jwtToken, roomId, addMessageToList]);

  useEffect(() => {
    if (room?.messages?.length > 0) {
      let initMessages = room.messages.map(m => {
        const participant = room.participants?.find(p => p.id === m.senderId);
        const user = users?.find(u => u.id === participant.userId);
        return {
          roomId: m.id,
          content: m.content,
          username: user ? user.name : "Unknown user",
        };
      });
      setMessages(initMessages);
    }
  }, [room?.messages, room?.participants, users]);

  if (isNaN(parseInt(roomId))) {
    return <ValidationMessage message={"Can't resolve room identifier"} />;
  }

  if (loadingState !== loadingStatusDict.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      roomId: +roomId,
      content: messageRef.current.value,
      username: userData.email,
    };

    hubConnectionRef.current
      .invoke(SEND_MESSAGE_EVENT, newMessage)
      .then(() => {
        messageRef.current.value = "";
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="chat-room">
      <h2>Welcome, {userData.email}!</h2>
      <h3>Room: '{room.name}'</h3>
      <div className="row">
        <div className="column small-12 medium-6">
          <Messages messages={messages} />
          <form onSubmit={handleSendMessage}>
            <div>
              <input
                type="text"
                placeholder="Enter your message"
                ref={messageRef}
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
          <h3>Room participants:</h3>
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
