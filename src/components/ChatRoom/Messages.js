import { useEffect } from "react";

const Messages = (props) => {
  useEffect(() => {
    if (props.roomMessages?.length > 0) {
      let initMessages = props.roomMessages.map((m) => {
        const participant = props.participants.find((p) => p.id === m.senderId);
        const user = props.users.find((u) => u.id === participant.userId);
        return {
          id: m.id,
          content: m.content,
          username: user ? user.name : "Unknown user",
        };
      });
      props.setMessages(initMessages);
    }
  }, [props.roomMessages, props.users]);

  return (
    <div>
      <ul className="list-group">
        {props.messages.map((msg, index) => (
          <li
            key={index}
            className={
              msg.username?.toLowerCase() === "system" ? "fst-italic" : ""
            }
          >
            <strong>{msg?.username}</strong>: {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
