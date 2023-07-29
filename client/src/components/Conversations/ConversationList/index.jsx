import ConversationListItem from "./ConversationListItem";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../EmptyState";
import Loader from "../../Loader";
import { showModal } from "../UserSearchModal";
import { openSearchModal } from "../../../redux/slices/userSlice";
import UserSearchItem from "../UserSearchItem";

const ConversationList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useSelector((state) => state.auth.completedFetch);
  const isLoading = useSelector(
    (state) => state.conversation.isLoadingConversations
  );
  const conversations = useSelector(
    (state) => state.conversation.conversationsList
  );

  const searchText = useSelector((state) => state.user.searchConversationText);
  const searchResults = useSelector(
    (state) => state.user.searchConversationResults
  );
  const isSearchingConversations = useSelector(
    (state) => state.user.isLoadingConversations
  );

  if (hasFetched && !user) return null;

  if (isLoading)
    return (
      <div className="bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
        <Loader ball text={"Fetching your conversations..."} />
      </div>
    );

  if (hasFetched && !isLoading && conversations.length === 0)
    return (
      <div className="bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
        <EmptyState
          title="No conversations yet"
          subtitle="Click on the pencil icon above to search for users to chat with."
        />
      </div>
    );

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div
        onClick={() => {
          dispatch(openSearchModal());
          showModal();
        }}
        className="absolute transition bottom-6 btn right-6 btn-lg btn-primary btn-circle z-10 shadow-black/40 shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
      </div>
      {searchText ? (
        <ul className="menu bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
          {isSearchingConversations ? (
            <Loader spinner small />
          ) : (
            searchResults?.conversations?.length === 0 &&
            searchResults?.users?.length === 0 && (
              <EmptyState
                title={`Sorry! Couldn't find anything on "${searchText}"`}
                subtitle="Try modifying the search phrase."
              />
            )
          )}
          {searchResults?.conversations?.length > 0 && (
            <h3 className="text-md font-medium tracking-wider mx-3 mt-2 mb-1 uppercase">
              Chats
            </h3>
          )}
          {searchResults?.conversations?.map((conversation) => (
            <ConversationListItem
              key={searchText + conversation._id}
              conversation={conversation}
            />
          ))}
          {searchResults?.users?.length > 0 && (
            <h3 className="text-md font-medium tracking-wider mx-3 mt-3 mb-1 uppercase">
              Contacts
            </h3>
          )}
          {searchResults?.users?.map((searchUser) => (
            <UserSearchItem
              key={searchText + searchUser._id}
              id={searchUser._id}
              avatar={searchUser.avatar}
              username={searchUser.username}
              displayname={searchUser.displayname}
              conversationListView={true}
            />
          ))}
        </ul>
      ) : (
        <ul className="menu bg-base-200 w-full h-full flex-col p-2 overflow-y-auto flex-nowrap rounded-box">
          {conversations?.map((conversation) => (
            <ConversationListItem
              key={conversation._id}
              conversation={conversation}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationList;
