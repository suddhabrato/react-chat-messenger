/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { selectConversation } from "../../../redux/slices/conversationSlice";

const ConversationListItem = ({ id, title, avatar, notif, activeChat }) => {
  const dispatch = useDispatch();
  return (
    <li className="w-full">
      <div
        className={`flex gap-4 justify-start w-full ${
          activeChat ? "active" : ""
        }`}
        onClick={() => dispatch(selectConversation(id))}
      >
        <div>
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img src={avatar} referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full overflow-x-hidden">
          <h3 className="text-md w-full truncate">{title}</h3>
          <p className="text-sm font-extralight h-6 truncate w-full">{notif}</p>
        </div>
      </div>
    </li>
  );
};

export default ConversationListItem;
