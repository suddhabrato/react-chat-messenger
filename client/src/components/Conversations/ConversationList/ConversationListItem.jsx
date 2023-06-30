/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../../../redux/slices/conversationSlice";

const ConversationListItem = ({ conversation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const currentConversation = useSelector(
    (state) => state.conversation.currentConversation
  );

  const getAvatar = (conversation) => {
    if (conversation.type === "Group") return conversation.avatar;

    const otherParticipant = conversation.participants.find(
      (participant) => participant._id != user._id
    );

    return otherParticipant.avatar;
  };

  const getTitle = (conversation) => {
    if (conversation.type === "Group") return conversation.title;

    const otherParticipant = conversation.participants.find(
      (participant) => participant._id != user._id
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
        return `You sent ${message.media.length} photos`;
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

  if (!conversation || !user) return null;
  const activeItem = currentConversation?._id === conversation?._id;
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
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img src={getAvatar(conversation)} referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full overflow-x-hidden">
          <h3 className="text-md w-full truncate">{getTitle(conversation)}</h3>
          <p className="text-sm font-extralight h-6 truncate w-full">
            {getNotif(conversation)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ConversationListItem;
