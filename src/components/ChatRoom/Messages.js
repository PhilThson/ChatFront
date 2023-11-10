const Messages = (props) => {
  console.log("Messages component");
  console.log(props.messages);
  return (
    <div className="message-list">
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
