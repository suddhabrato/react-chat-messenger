/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const ConversationListItem = ({ id, title, avatar, notif }) => {
  return (
    <li className="w-full">
      <NavLink
        className="flex gap-4 justify-start w-full"
        to={`/conversations/${id}`}
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
      </NavLink>
    </li>
  );
};

export default ConversationListItem;
