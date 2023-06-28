import ConversationListPanel from "./ConversationListPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import MessageListPanel from "./MessageListPanel";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { clearCurrentConversation } from "../../redux/slices/conversationSlice";

// eslint-disable-next-line react/prop-types
const ConversationsPage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useSelector((state) => state.auth.completedFetch);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const chatOpen = useSelector(
    (state) => state.conversation.currentConversation
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        dispatch(clearCurrentConversation());
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || (!user && !hasFetched))
    return (
      <div className="flex lg:justify-evenly max-w-screen lg:p-2 h-[calc(100dvh-4rem)]">
        <Loader />
      </div>
    );

  return (
    <div className="flex lg:justify-evenly max-w-screen lg:p-2 h-[calc(100dvh-4rem)]">
      {isDesktop ? (
        <>
          <ConversationListPanel />
          <div className="flex bg-base-100 w-full lg:w-2/3 flex-col h-full p-2">
            {chatOpen && <MessageListPanel />}
          </div>
        </>
      ) : (
        <>
          {chatOpen ? (
            <div className="flex bg-base-100 w-full flex-col h-full">
              <MessageListPanel />
            </div>
          ) : (
            <ConversationListPanel />
          )}
        </>
      )}
    </div>
  );
};

export default ConversationsPage;
