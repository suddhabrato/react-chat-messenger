import { useDispatch, useSelector } from "react-redux";
import { setCreatingNewConversation } from "../../redux/slices/conversationSlice";

// eslint-disable-next-line react/prop-types
const UserSearchItem = ({ id, username, displayname, avatar }) => {
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
    <li className="w-full">
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
    </li>
  );
};

export default UserSearchItem;
