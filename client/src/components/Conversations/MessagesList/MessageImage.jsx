/* eslint-disable react/prop-types */
const options = { hour: "2-digit", minute: "2-digit" };
const MessageImage = ({
  body,
  images,
  author,
  seenTime,
  avatar,
  sentTime,
  self,
}) => {
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
      <div className="chat-bubble w-min">
        {images?.map((image) => (
          <img
            key={image.publicId}
            className="object-cover rounded-xl max-w-[50vw] max-h-[40vh] my-2"
            src={image.imageUrl}
          />
        ))}
        <div className="flex break-all">{body}</div>
      </div>
      {seenTime && (
        <div className="chat-footer opacity-50">Seen at {seenTime}</div>
      )}
    </div>
  );
};

export default MessageImage;
