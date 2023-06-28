import { useEffect, useMemo } from "react";
import ConversationListItem from "./ConversationListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversations } from "../../../redux/actions/conversationActions";
import { useNavigate } from "react-router-dom";

const ConversationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useSelector((state) => state.auth.completedFetch);
  const state = useSelector((state) => state.conversation);

  const conversations = useMemo(() => {
    return state.data;
  }, [state.data]);

  useEffect(() => {
    console.log(hasFetched);
    if (hasFetched) {
      if (user) dispatch(getAllConversations());
      else navigate("/");
    }
  }, [dispatch, user, hasFetched, navigate]);

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
    if (message.author._id === user._id) return `You: ${message.text}`;
    else if (conversation.type === "Group")
      return `${message.author.displayname}: ${message.text}`;
    else return message.text;
  };

  if (hasFetched && !user) return null;

  return (
    <ul className="menu bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
      {conversations?.map((conversation) => (
        <ConversationListItem
          key={conversation._id}
          id={conversation._id}
          avatar={getAvatar(conversation)}
          title={getTitle(conversation)}
          notif={getNotif(conversation)}
        />
      ))}
    </ul>
  );
};

export default ConversationList;
