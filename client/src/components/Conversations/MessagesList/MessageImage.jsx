import React from "react";

const MessageImage = ({
  body,
  image,
  author,
  seenTime,
  avatar,
  sentTime,
  self,
}) => {
  return (
    <div className={`chat ${self ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} />
        </div>
      </div>
      <div className="chat-header">
        {author}
        <time className="text-xs opacity-50">{sentTime}</time>
      </div>
      <div className="chat-bubble w-min">
        <img
          className="object-cover rounded-xl max-w-[50vw] max-h-[40lvh] my-2"
          src={image}
        />
        <div className="flex break-all">{body}</div>
      </div>
      <div className="chat-footer opacity-50">Seen at {seenTime}</div>
    </div>
  );
};

export default MessageImage;
