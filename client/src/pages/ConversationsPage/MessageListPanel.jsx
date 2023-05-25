import MessagesList from "../../components/Conversations/MessagesList";
import { Link } from "react-router-dom";

const MessageListPanel = () => {
  return (
    <div className="flex flex-col w-full h-full bg-base-200 lg:rounded-2xl overflow-hidden">
      <div className="flex bg-base-300 px-1 lg:px-4 py-2 items-center w-full">
        <div className="flex justify-start w-3/4 items-center">
          <Link
            className="btn btn-circle btn-ghost lg:hidden -mr-3"
            to="/conversations"
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
          </Link>
          <Link className="btn btn-ghost capitalize font-normal py-2 h-auto rounded-xl truncate w-full">
            <div className="flex items-center gap-3 w-full">
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img src={"https://placeimg.com/192/192/people"} />
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-0 truncate w-full">
                <h3 className="text-lg font-medium truncate leading-tight">
                  Suddhabrato Ghoshsssssssssssssss
                </h3>
                <p className="text-xs leading-tight">Active Now</p>
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
          type="text"
          placeholder="Type here"
          className="input focus:border-0 mx-2 w-full input-md focus:outline-0 rounded-full input-ghost bg-base-200 hover:bg-base-100 focus:bg-base-100 transition-all duration-300"
        />
        <button className="btn btn-ghost btn-circle btn-success">
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
    </div>
  );
};

export default MessageListPanel;
