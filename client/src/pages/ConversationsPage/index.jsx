import ConversationListPanel from "./ConversationListPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import MessageListPanel from "./MessageListPanel";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { clearCurrentConversation } from "../../redux/slices/conversationSlice";
import UserSearchModal from "../../components/Conversations/UserSearchModal";
import EmptyState from "../../components/EmptyState";
import placeholder from "../../assets/ConversationEmptyState.svg";
import {
  clearConversationSearch,
  clearCurrentMessage,
  closeGroupModal,
  closeSearchModal,
} from "../../redux/slices/userSlice";
import { getAllConversations } from "../../redux/actions/conversationActions";
import { useNavigate } from "react-router";
import CreateGroupModal from "../../components/Conversations/CreateGroupModal";
import MessageInfoModal from "../../components/Conversations/MessageInfoModal";

// eslint-disable-next-line react/prop-types
const ConversationsPage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useSelector((state) => state.auth.completedFetch);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const chatOpen = useSelector(
    (state) => state.conversation.currentConversation
  );
  const isSearchModalOpen = useSelector((state) => state.user.searchModalOpen);
  const isGroupModalOpen = useSelector((state) => state.user.newGroupModalOpen);
  const isMessageInfoModalOpen = useSelector(
    (state) => state.user.messageInfoModalOpen
  );
  const searchText = useSelector((state) => state.user.searchConversationText);

  useEffect(() => {
    if (hasFetched) {
      if (user) dispatch(getAllConversations());
      else navigate("/");
    }
  }, [dispatch, hasFetched, user, navigate]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        if (
          !isSearchModalOpen &&
          !isGroupModalOpen &&
          !isMessageInfoModalOpen
        ) {
          dispatch(clearCurrentConversation());
          if (searchText) dispatch(clearConversationSearch());
        }
        if (isSearchModalOpen) dispatch(closeSearchModal());
        if (isGroupModalOpen) dispatch(closeGroupModal());
        if (isMessageInfoModalOpen) dispatch(clearCurrentMessage());
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchModalOpen, isGroupModalOpen, isMessageInfoModalOpen, searchText]);

  useEffect(() => {
    const handleBackButton = () => {
      if (chatOpen) {
        dispatch(clearCurrentConversation());
      } else {
        navigate("/", { replace: true });
      }
    };

    // Override the default behavior of the browser's back button
    if (!chatOpen) {
      window.history.pushState(null, null, window.location.pathname);
    }
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen, navigate]);

  if (isLoading || (!user && !hasFetched))
    return (
      <div className="flex lg:justify-evenly max-w-screen lg:p-2 h-[calc(100dvh-4rem)]">
        <Loader />
      </div>
    );

  return (
    <div className="flex lg:justify-evenly max-w-screen lg:p-2 h-[calc(100dvh-4rem)]">
      <MessageInfoModal />
      <UserSearchModal />
      <CreateGroupModal />
      {isDesktop ? (
        <>
          <ConversationListPanel />
          <div className="flex bg-base-100 w-full lg:w-2/3 flex-col h-full p-2">
            {chatOpen ? (
              <MessageListPanel />
            ) : (
              <div className="flex flex-col w-full h-full bg-base-200 lg:rounded-2xl overflow-hidden">
                <EmptyState
                  title="React Chat Messenger"
                  subtitle="Real-time chat messaging app for users around the world"
                  image={placeholder}
                  large
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className={`${
              !chatOpen ? "hidden" : "flex"
            } bg-base-100 w-full flex-col h-full `}
          >
            <MessageListPanel />
          </div>
          <div className={`${chatOpen ? "hidden" : "flex"} w-full h-full`}>
            <ConversationListPanel />
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationsPage;
