import { useEffect, useMemo } from "react";
import ConversationListItem from "./ConversationListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversations } from "../../../redux/actions/conversationActions";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../EmptyState";
import Loader from "../../Loader";

const ConversationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useSelector((state) => state.auth.completedFetch);
  const isLoading = useSelector(
    (state) => state.conversation.isLoadingConversations
  );
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

  if (isLoading)
    return (
      <div className="bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
        <Loader ball />
      </div>
    );

  if (hasFetched && !isLoading && conversations.length === 0)
    return (
      <div className="bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
        <EmptyState
          title="No conversations yet"
          subtitle="Click on the pencil icon above to search for users to chat with."
        />
      </div>
    );

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
