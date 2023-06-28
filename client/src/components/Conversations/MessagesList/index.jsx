import { useDispatch, useSelector } from "react-redux";
import MessageImage from "./MessageImage";
import MessageText from "./MessageText";
import { useEffect } from "react";
import { getAllMessages } from "../../../redux/actions/conversationActions";
import Loader from "../../Loader";

const MessagesList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const conversationId = useSelector(
    (state) => state.conversation.currentConversation
  );
  const messages = useSelector((state) => state.conversation.messages);
  const isLoading = useSelector((state) => state.conversation.isLoading);

  console.table(messages);
  useEffect(() => {
    if (conversationId) dispatch(getAllMessages({ id: conversationId }));
  }, [conversationId, dispatch]);

  if (isLoading && conversationId) return <Loader />;

  return (
    <div className="bg-base-200 w-full h-full p-4 lg:p-6 overflow-y-auto">
      {messages.map((message) => {
        if (message.media.length > 0) {
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
              author={message.author?.displayname}
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
