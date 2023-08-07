/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import MessageControlDropdown from "../MessageControlDropdown";
import { useEffect, useRef } from "react";
import { markMessageAsSeen } from "../../../redux/actions/conversationActions";
import { formatRelativeDateSeen } from "../../../utils/DateTimeHelper";
import { to_Decrypt } from "../../../utils/aes";

const options = { hour: "2-digit", minute: "2-digit" };

const MessageText = ({
  body,
  author,
  avatar,
  sentTime,
  self,
  id,
  last,
  message,
}) => {
  const divRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen()) {
          dispatch(markMessageAsSeen(id));
          observer.unobserve(entry.target); // Stop observing once it's in view
        }
      });
    }, options);

    if (divRef.current && !seen()) {
      observer.observe(divRef.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const conversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const user = useSelector((state) => state.auth.user);
  const createdAt = new Date(sentTime).toLocaleTimeString("en-US", options);
  const seen = () => {
    if (message.author._id === user._id) return true;
    const res = message.seen.find(
      (seenUser) => seenUser.viewer._id === user?._id
    );
    return res ? true : false;
  };

  const seenString = () => {
    if (message.author._id !== user._id) return null;
    if (conversation.type === "Individual") {
      const seenUser = message.seen.find(
        (seenUser) =>
          seenUser.viewer._id !== message.author._id &&
          seenUser.viewer._id !== user._id
      );
      if (seenUser)
        return (
          "Seen: " +
          `${formatRelativeDateSeen(new Date(seenUser.viewedAt))} at ${new Date(
            seenUser.viewedAt
          ).toLocaleTimeString("en-US", options)}`
        );
      return null;
    }
    const seenUsers = message.seen.filter(
      (seenUser) =>
        seenUser.viewer._id !== message.author._id &&
        seenUser.viewer._id !== user._id
    );
    if (seenUsers?.length)
      return `Seen by: ${seenUsers[0].viewer.displayname.split(" ")[0]}${
        seenUsers.length > 1 ? ` and ${seenUsers.length - 1} more` : ""
      }`;
    return null;
  };

  return (
    <div
      ref={divRef}
      className={`chat group transition ${self ? "chat-end" : "chat-start"} ${
        !seen() ? "bg-opacity-20 bg-sky-300" : ""
      } px-4 lg:px-6`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} referrerPolicy="no-referrer" />
        </div>
      </div>
      <div className="chat-header">
        {author + " "}
        <time className="text-xs opacity-50">{createdAt}</time>
      </div>
      <div className="chat-bubble break-all pr-5">
        <MessageControlDropdown
          self={self}
          id={id}
          last={last}
          message={message}
        />
        {to_Decrypt(body, sentTime)}
      </div>
      {seenString() && (
        <div className="chat-footer opacity-50 text-end">{seenString()}</div>
      )}
    </div>
  );
};

export default MessageText;
