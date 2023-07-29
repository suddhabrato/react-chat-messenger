import { useDispatch, useSelector } from "react-redux";
import MessageImage from "./MessageImage";
import MessageText from "./MessageText";
import { useEffect, useRef, useState } from "react";
import {
  getAllMessages,
  lookUpConversationByParticipants,
} from "../../../redux/actions/conversationActions";
import Loader from "../../Loader";
import EmptyState from "../../EmptyState";
import placeholder from "../../../assets/EmptyChat_Placeholder.svg";

const MessagesList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const conversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const messages = useSelector((state) => state.conversation.messages);
  const isLoading = useSelector((state) => state.conversation.isLoading);

  const messageListRef = useRef(null);
  // const [prevMessages, setPrevMessages] = useState(0);
  const [canScrollToBottom, setCanScrollToBottom] = useState(false);

  useEffect(() => {
    if (conversation) {
      // setPrevMessages(0);
      setCanScrollToBottom(false);
      if (conversation._id) dispatch(getAllMessages({ id: conversation._id }));
      else if (
        conversation.participants &&
        conversation?.participants?.length > 0
      )
        dispatch(
          lookUpConversationByParticipants({
            participants: conversation.participants.map(
              (participant) => participant._id
            ),
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?._id, dispatch]);

  const scrollToLastMessage = () => {
    if (messageListRef.current)
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  };

  useEffect(() => {
    const scrollContainer = messageListRef.current;

    const handleScroll = () => {
      if (scrollContainer) {
        const { scrollTop, clientHeight } = scrollContainer;
        const atBottom = Math.abs(scrollTop) >= clientHeight / 3;
        setCanScrollToBottom(atBottom);
      }
    };

    scrollContainer && scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer &&
        scrollContainer.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageListRef.current]);

  // useEffect(() => {
  //   if (messageListRef.current && !isLoading) {
  //     if (prevMessages > 0 && prevMessages < messages.length)
  //       setTimeout(() => {
  //         if (messageListRef.current)
  //           messageListRef.current.scrollTop =
  //             messageListRef.current.scrollHeight;
  //       }, 100);
  //     setPrevMessages(messages.length);
  //   }
  // }, [isLoading, messages, prevMessages]);

  if (isLoading && conversation)
    return <Loader text={"Fetching your messages..."} />;
  if (!isLoading && conversation && messages?.length === 0)
    return (
      <EmptyState
        title="Seems quite in here"
        subtitle="Start a conversation"
        image={placeholder}
      />
    );

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div
        onClick={scrollToLastMessage}
        className={`absolute transition duration-200 bottom-6 right-6 z-10 ${
          canScrollToBottom || conversation.unseenMessageCount > 0
            ? "scale-100"
            : "scale-0 opacity-0"
        }`}
      >
        <div className="indicator">
          {conversation.unseenMessageCount > 0 && (
            <span className="indicator-item badge indicator-center badge-secondary">
              {conversation.unseenMessageCount > 99
                ? "99+"
                : conversation.unseenMessageCount}
            </span>
          )}
          <button className="btn btn-lg btn-circle shadow-black/40 shadow-xl">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={messageListRef}
        className="bg-base-200 w-full h-full py-4 lg:py-6 overflow-y-auto overflow-x-hidden flex flex-col-reverse scroll-smooth gap-1 relative"
      >
        {messages.map((message, ind) => {
          if (message.media?.length > 0) {
            return (
              <MessageImage
                message={message}
                last={ind === 0}
                key={message._id}
                id={message._id}
                author={
                  message.author._id === user._id
                    ? "You"
                    : message.author.displayname
                }
                images={message?.media}
                avatar={message.author?.avatar}
                body={message?.text}
                sentTime={message?.createdAt}
                self={message?.author?._id === user._id}
              />
            );
          } else
            return (
              <MessageText
                message={message}
                last={ind === 0}
                id={message._id}
                key={message._id}
                author={
                  message.author._id === user._id
                    ? "You"
                    : message.author.displayname
                }
                avatar={message.author?.avatar}
                body={message?.text}
                sentTime={message?.createdAt}
                self={message?.author?._id === user._id}
              />
            );
        })}
      </div>
    </div>
  );
};

export default MessagesList;
