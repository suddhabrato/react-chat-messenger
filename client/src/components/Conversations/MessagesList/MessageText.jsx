const options = { hour: "2-digit", minute: "2-digit" };

// eslint-disable-next-line react/prop-types
const MessageText = ({ body, author, seenTime, avatar, sentTime, self }) => {
  const createdAt = new Date(sentTime).toLocaleTimeString("en-US", options);
  return (
    <div className={`chat ${self ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} />
        </div>
      </div>
      <div className="chat-header">
        {author + " "}
        <time className="text-xs opacity-50">{createdAt}</time>
      </div>
      <div className="chat-bubble break-all">{body}</div>
      {seenTime && (
        <div className="chat-footer opacity-50">Seen at {seenTime}</div>
      )}
    </div>
  );
};

export default MessageText;
