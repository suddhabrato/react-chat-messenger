import React from "react";
import { NavLink } from "react-router-dom";

const ConversationListItem = ({
  conversationTitle,
  conversationAvatar,
  conversationNotif,
}) => {
  return (
    <li className="w-full">
      <NavLink
        className="flex gap-4 justify-start w-full"
        to={`/conversations/${Math.floor(Math.random() * 100)}`}
      >
        <div>
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img src={conversationAvatar} />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full overflow-x-hidden">
          <h3 className="text-md w-full truncate">{conversationTitle}</h3>
          <p className="text-sm font-extralight h-6 truncate w-full">
            {conversationNotif}
          </p>
        </div>
      </NavLink>
    </li>
  );
};

export default ConversationListItem;