/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setCreatingNewConversation } from "../../redux/slices/conversationSlice";

const UserSearchItem = ({
  id,
  username,
  displayname,
  avatar,
  group,
  addParticipant,
  removeParticipant,
  selected,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const conversation = {
    _id: null,
    messages: [],
    participants: [
      {
        _id: user?._id,
        avatar: user?.avatar,
        username: user?.username,
        displayname: user?.displayname,
      },
      { _id: id, avatar, username, displayname },
    ],
    type: "Individual",
  };
  if (!user) return null;
  return (
    <li
      style={{ cursor: "pointer" }}
      className={`w-full ${selected ? "disabled" : ""}`}
    >
      {group ? (
        <div
          className="flex gap-3 justify-start items-center w-full p-2 pb-1"
          onClick={() =>
            selected
              ? removeParticipant({ _id: id, avatar, username, displayname })
              : addParticipant({ _id: id, avatar, username, displayname })
          }
        >
          <div>
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img
                  src={avatar}
                  className={selected ? "grayscale-[50%]" : ""}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full overflow-x-hidden">
            <h3 className="text-md w-full truncate">{displayname}</h3>
            <p className="text-sm font-extralight h-6 truncate w-full">
              @{username}
            </p>
          </div>
          <div
            className={`btn btn-sm btn-circle ${
              selected ? "btn-outline" : "btn-neutral"
            }`}
          >
            {selected ? (
              <svg
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                className="w-5 h-5"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            )}
          </div>
        </div>
      ) : (
        <button
          className="flex gap-3 justify-start items-center w-full p-2 pb-1"
          onClick={() => dispatch(setCreatingNewConversation(conversation))}
        >
          <div>
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src={avatar} referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full overflow-x-hidden">
            <h3 className="text-md w-full truncate">{displayname}</h3>
            <p className="text-sm font-extralight h-6 truncate w-full">
              @{username}
            </p>
          </div>
        </button>
      )}
    </li>
  );
};

export default UserSearchItem;
