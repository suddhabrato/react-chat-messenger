import { useDispatch, useSelector } from "react-redux";
import MessageImage from "./MessageImage";
import MessageText from "./MessageText";
import { useEffect, useRef } from "react";
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
    //Workaround to activate scrollintoview after dom has rendered
    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  }, [messages]);

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
    <div className="bg-base-200 w-full h-full p-4 lg:p-6 overflow-y-auto">
      {messages.map((message) => {
        if (message.media?.length > 0) {
          return (
            <MessageImage
              key={message._id}
              author={message.author?.displayname}
              avatar={message.author?.avatar}
              body={message?.text}
              sentTime={message?.createdAt}
              self={message?.author?._id === user._id}
            />
          );
        } else
          return (
            <MessageText
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
      <div ref={messageListRef}></div>
    </div>
  );
};

export default MessagesList;
