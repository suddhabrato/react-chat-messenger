import { useDispatch, useSelector } from "react-redux";
import MessagesList from "../../components/Conversations/MessagesList";
import { Link } from "react-router-dom";
import MessageInput from "../../components/Conversations/MessageInput";
import { clearCurrentConversation } from "../../redux/slices/conversationSlice";

const MessageListPanel = () => {
  const dispatch = useDispatch();
  const currentConversation = useSelector(
    (state) => state.conversation.currentConversation
  );

  const user = useSelector((state) => state.auth.user);
  const activeUsers = useSelector((state) => state.user.activeUsers);

  const getActiveStatus = (conversation) => {
    if (conversation.type === "Group") {
      return conversation.participants.find(
        (participant) =>
          participant._id !== user._id && activeUsers.includes(participant._id)
      );
    } else if (conversation.type === "Individual") {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id !== user._id
      );

      return activeUsers.includes(otherParticipant._id);
    }
    return false;
  };
  const getTitle = (conversation) => {
    if (conversation.type === "Group") return conversation.title;

    const otherParticipant = conversation.participants.find(
      (participant) => participant._id != user._id
    );

    return otherParticipant.displayname;
  };

  const getAvatar = (conversation) => {
    if (conversation.type === "Group") return conversation.avatar;

    const otherParticipant = conversation.participants.find(
      (participant) => participant._id != user._id
    );

    return otherParticipant.avatar;
  };

  const getParticipantNames = (conversation) => {
    if (conversation.type !== "Group") return;
    const names = conversation.participants
      .filter((participant) => participant._id !== user._id)
      .map((participant) =>
        participant.displayname.length > 10 ||
        conversation.participants.length > 3
          ? participant.displayname.split(" ")[0]
          : participant.displayname
      )
      .join(", ");
    return names;
  };

  return (
    <div className="flex flex-col w-full h-full bg-base-200 lg:rounded-2xl overflow-hidden">
      <div className="flex bg-base-300 px-1 lg:px-4 py-2 items-center w-full">
        <div className="flex justify-start w-3/4 items-center">
          <button
            className="btn btn-circle btn-ghost lg:hidden -mr-3"
            onClick={() => dispatch(clearCurrentConversation())}
          >
            <svg
              className="w-5 h-5"
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <Link className="btn btn-ghost normal-case font-normal py-2 h-auto rounded-xl truncate w-full">
            <div className="flex items-center gap-3 w-full">
              <div
                className={`avatar ${
                  getActiveStatus(currentConversation) ? "online" : "offline"
                }`}
              >
                <div className="w-10 rounded-full">
                  <img src={getAvatar(currentConversation)} />
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-0 truncate w-full">
                <h3 className="text-lg font-medium truncate leading-tight">
                  {getTitle(currentConversation)}
                </h3>
                <p className="text-xs leading-tight truncate w-full text-start">
                  {currentConversation.type === "Group"
                    ? getParticipantNames(currentConversation)
                    : getActiveStatus(currentConversation)
                    ? "Active Now"
                    : "Offline"}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-end w-full items-center">
          <button className="btn btn-ghost btn-circle">
            <svg
              className="w-6 h-6"
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        </div>
      </div>
      <MessagesList />
      <MessageInput />
    </div>
  );
};

export default MessageListPanel;
