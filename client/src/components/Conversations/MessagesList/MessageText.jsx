/* eslint-disable react/prop-types */
import MessageControlDropdown from "../MessageControlDropdown";

const options = { hour: "2-digit", minute: "2-digit" };

const MessageText = ({
  body,
  author,
  seenTime,
  avatar,
  sentTime,
  self,
  id,
}) => {
  const createdAt = new Date(sentTime).toLocaleTimeString("en-US", options);
  return (
    <div className={`chat group ${self ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} />
        </div>
      </div>
      <div className="chat-header">
        {author + " "}
        <time className="text-xs opacity-50">{createdAt}</time>
      </div>
      <div className="chat-bubble break-all pr-5">
        <MessageControlDropdown self={self} id={id} />
        {body}
      </div>
      {seenTime && (
        <div className="chat-footer opacity-50">Seen at {seenTime}</div>
      )}
    </div>
  );
};

export default MessageText;
