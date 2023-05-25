import ConversationListPanel from "./ConversationListPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import MessageListPanel from "./MessageListPanel";

const ConversationsPage = ({ convId, chatOpen }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
