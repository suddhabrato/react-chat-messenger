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
    return state.conversationsList;
  }, [state.conversationsList]);

  useEffect(() => {
    if (hasFetched) {
      if (user) dispatch(getAllConversations());
      else navigate("/");
    }
  }, [dispatch, hasFetched, user, navigate]);

  if (hasFetched && !user) return null;

  return (
    <ul className="menu bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
      {conversations?.map((conversation) => (
        <ConversationListItem
          key={conversation._id}
          conversation={conversation}
        />
      ))}
    </ul>
  );
};

export default ConversationList;
