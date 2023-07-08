/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../../../redux/slices/conversationSlice";
import { formatRelativeDate } from "../../../utils/DateTimeHelper";
import { useEffect, useState } from "react";
import { getSocket } from "../../../socketService";

const ConversationListItem = ({ conversation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const currentConversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on(
        "typingUpdateToClient",
        ({ conversation: convo, typingUser: typeUser }) => {
          if (conversation._id === convo._id)
            setTypingUsers((prev) => [typeUser, ...prev]);
        }
      );
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("typingUpdateToClient");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on(
        "notTypingUpdateToClient",
        ({ conversation: convo, typingUser: typeUser }) => {
          if (conversation._id === convo._id)
            setTypingUsers((prev) =>
              prev.filter((item) => item._id !== typeUser._id)
            );
        }
      );
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("notTypingUpdateToClient");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const activeUsers = useSelector((state) => state.user.activeUsers);

  const getActiveStatus = (conversation) => {
    if (conversation.type === "Group") {
      return conversation.participants.find(
        (participant) =>
          participant._id !== user._id && activeUsers.includes(participant._id)
      );
    } else if (conversation.type === "Individual") {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id !== user._id
      );

      return activeUsers.includes(otherParticipant._id);
    }
    return false;
  };

  const getAvatar = (conversation) => {
    if (conversation.type === "Group") return conversation.avatar;

    const otherParticipant = conversation.participants.find(
      (participant) => participant._id !== user._id
    );

    return otherParticipant.avatar;
  };

  const getTitle = (conversation) => {
    if (conversation.type === "Group") return conversation.title;

    const otherParticipant = conversation.participants.find(
      (participant) => participant._id !== user._id
    );

    return otherParticipant.displayname;
  };

  const getNotif = (conversation) => {
    if (conversation.messages.length === 0) return "No messages yet";

    const message = conversation.messages[0];
    if (message.text) {
      if (message.author._id === user._id) return `You: ${message.text}`;
      else if (conversation.type === "Group")
        return `${message.author.displayname}: ${message.text}`;
      else return message.text;
    } else if (message.media?.length > 0) {
      if (message.author._id === user._id)
        return `You sent ${message.media.length} ${
          message.media.length === 1 ? "photo" : "photos"
        }`;
      else if (conversation.type === "Group")
        return `${message.author.displayname} sent ${message.media.length} ${
          message.media.length === 1 ? "photo" : "photos"
        }`;
      else
        return `${message.media.length} ${
          message.media.length === 1 ? "photo" : "photos"
        }`;
    }
  };

  const unseenCount = conversation.unseenMessageCount;

  if (!conversation || !user) return null;

  const activeItem = currentConversation?._id === conversation?._id;

  const getTypingText = (conversation, typingUsers) => {
    if (!typingUsers || typingUsers.length === 0) return null;
    if (conversation.type === "Individual") return "Typing...";
    return `${typingUsers[0].displayname.split(" ")[0]} is typing...`;
  };

  return (
    <li className="w-full">
      <div
        className={`flex gap-4 justify-start w-full ${
          activeItem ? "active" : ""
        }`}
        onClick={() =>
          !activeItem && dispatch(selectConversation(conversation))
        }
      >
        <div>
          <div
            className={`avatar ${
              getActiveStatus(conversation) ? "online" : "offline"
            }`}
          >
            <div className="w-14 rounded-full">
              <img src={getAvatar(conversation)} referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full overflow-x-hidden">
          <h3 className="text-md w-full truncate">{getTitle(conversation)}</h3>
          <p
            className={`text-sm h-6 truncate w-full ${
              typingUsers && typingUsers.length > 0
                ? "font-medium text-success"
                : "font-extralight"
            }`}
          >
            {typingUsers && typingUsers.length
              ? getTypingText(conversation, typingUsers)
              : getNotif(conversation)}
          </p>
        </div>
        <div className="flex flex-col h-12 text-xs items-end justify-between">
          {formatRelativeDate(new Date(conversation.updatedAt))}
          {unseenCount > 0 && (
            <div className="badge badge-primary badge-sm min-h-[22px] min-w-[22px] text-xs text-white">
              {unseenCount}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ConversationListItem;
