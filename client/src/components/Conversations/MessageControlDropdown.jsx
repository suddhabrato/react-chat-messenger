/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../../redux/actions/conversationActions";
import { useState } from "react";
import { setCreatingNewConversation } from "../../redux/slices/conversationSlice";
import { showMessageInfoModal } from "./MessageInfoModal";
import { setCurrentMessage } from "../../redux/slices/userSlice";

const MessageControlDropdown = ({ self, last, message }) => {
  const conversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const dispatch = useDispatch();
  const [isDeleting, setDeleting] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const newConvo = {
    _id: null,
    messages: [],
    participants: [
      {
        _id: user?._id,
        avatar: user?.avatar,
        username: user?.username,
        displayname: user?.displayname,
      },
      {
        _id: message.author._id,
        avatar: message.author.avatar,
        username: message.author.username,
        displayname: message.author.displayname,
      },
    ],
    type: "Individual",
  };

  return (
    <div className="absolute top-1 right-2">
      <div
        className={`dropdown ${last ? "dropdown-top" : "dropdown-bottom"} ${
          self ? "dropdown-left" : "dropdown-right"
        }`}
      >
        <label
          tabIndex={0}
          className="cursor-pointer drop-shadow-2xl text-neutral-50 hidden group-hover:block group-active:block "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </label>
        <ul
          data-theme="dark"
          tabIndex={0}
          className="menu bg-base-100 w-56 shadow rounded-box dropdown-content z-[1]"
        >
          {!self && (
            <li onClick={() => dispatch(setCreatingNewConversation(newConvo))}>
              <a>
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                {`Message ${message?.author?.displayname.split(" ")[0]}`}
              </a>
            </li>
          )}
          {self && (
            <li
              onClick={() => {
                dispatch(setCurrentMessage(message));
                showMessageInfoModal();
              }}
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Info
              </a>
            </li>
          )}
          {self && (
            <li
              className={isDeleting ? "disabled" : ""}
              onClick={() => {
                setDeleting(true);
                dispatch(deleteMessage({ msg: message, conversation }));
              }}
            >
              <a>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Delete
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MessageControlDropdown;
