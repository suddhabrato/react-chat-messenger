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
  const [prevMessages, setPrevMessages] = useState(messages.length);

  useEffect(() => {
    if (conversation) {
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
  }, [conversation, dispatch]);

  useEffect(() => {
    if (messageListRef.current && !isLoading) {
      if (prevMessages < messages.length)
        setTimeout(() => {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
        }, 100);
      setPrevMessages(messages.length);
    }
  }, [isLoading, messages, prevMessages]);

  if (isLoading && conversation) return <Loader />;
  if (!isLoading && conversation && messages.length === 0)
    return (
      <EmptyState
        title="Seems quite in here"
        subtitle="Start a conversation"
        image={placeholder}
      />
    );
  return (
    <div
      ref={messageListRef}
      className="bg-base-200 w-full h-full py-4 lg:py-6 overflow-y-auto overflow-x-hidden flex flex-col-reverse scroll-smooth gap-1"
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
  );
};

export default MessagesList;
