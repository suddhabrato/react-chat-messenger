import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../redux/actions/conversationActions";
import { setMessageText } from "../../redux/slices/conversationSlice";
import { useEffect, useRef } from "react";
const MessageInput = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const isSubmitting = useSelector(
    (state) => state.conversation.sendingMessage
  );
  const currentConversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const messageText = useSelector((state) => state.conversation.newMessageText);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    dispatch(setMessageText(e.target.value));
  };

  useEffect(() => {
    if (!isSubmitting && inputRef.current) inputRef.current.focus();
  }, [isSubmitting]);

  const handleSubmit = () => {
    if (!messageText.trim()) return console.log("Empty Message");
    if (currentConversation) {
      const body = {
        recipients: currentConversation.participants.map(
          (participant) => participant._id
        ),
        convId: currentConversation?._id,
        text: messageText.trim(),
        media: [],
        type: currentConversation?.type || "Individual",
      };
      dispatch(createNewMessage({ data: body }));
    }
  };

  return (
    <div className="w-full bg-base-300 flex p-2 items-center justify-center gap-0">
      <button className="btn btn-ghost btn-circle">
        <svg
          className="w-7 h-7"
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
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
      </button>

      <input
        autoFocus
        type="text"
        placeholder="Type a message"
        ref={inputRef}
        disabled={isSubmitting}
        value={messageText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="input focus:border-0 mx-2 w-full input-md focus:outline-0 rounded-full input-ghost bg-base-200 hover:bg-base-100 focus:bg-base-100 transition-all duration-300"
      />
      <button
        disabled={isSubmitting}
        className="btn btn-ghost btn-circle"
        onClick={handleSubmit}
      >
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
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
