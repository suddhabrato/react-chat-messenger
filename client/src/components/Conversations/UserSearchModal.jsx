import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  closeSearchModal,
  openGroupModal,
  setSearchText,
} from "../../redux/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import { getSearchUsers } from "../../redux/actions/userActions";
import UserSearchItem from "./UserSearchItem";
import { showGroupModal } from "./CreateGroupModal";
import useMediaQuery from "../../hooks/useMediaQuery";

// eslint-disable-next-line react-refresh/only-export-components
export const showModal = () => {
  window.new_message_modal.showModal();
};

const UserSearchModal = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.user.searchText);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const searchResults = useSelector((state) => state.user.searchResults);
  const isSearchModalOpen = useSelector((state) => state.user.searchModalOpen);

  useEffect(() => {
    dispatch(clearSearch());
    if (searchRef.current && isSearchModalOpen && isDesktop)
      searchRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchModalOpen, isDesktop]);

  const handleSearchChange = (e) => {
    dispatch(setSearchText(e.target.value));
    clearTimeout(searchTimeout);

    if (e.target.value === "") {
      dispatch(clearSearch());
      return;
    }

    setSearchTimeout(
      setTimeout(() => {
        dispatch(getSearchUsers(e.target.value));
      }, 500)
    );
  };

  return (
    <dialog id="new_message_modal" className="modal">
      <form method="dialog" className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => dispatch(closeSearchModal())}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Create new conversation</h3>
        <p className="py-4">
          Search for the user you want to message or
          <br />
          <button
            onClick={() => {
              showGroupModal();
              dispatch(openGroupModal());
              dispatch(closeSearchModal());
            }}
            className="link"
          >
            Click Here
          </button>{" "}
          to create a group conversation
        </p>

        <div className="join w-full">
          <input
            ref={searchRef}
            className="input input-bordered join-item w-full text-sm focus:outline-none"
            placeholder="Search by username, profile name or email..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <div className="btn join-item">Search</div>
        </div>
        {searchResults.length > 0 && (
          <ul className="menu bg-base-200 w-full rounded-box max-h-52 flex-nowrap overflow-y-auto mt-4">
            {searchResults?.map((searchUser) => (
              <UserSearchItem
                key={searchUser._id}
                id={searchUser._id}
                avatar={searchUser.avatar}
                username={searchUser.username}
                displayname={searchUser.displayname}
              />
            ))}
          </ul>
        )}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => dispatch(closeSearchModal())}>close</button>
      </form>
    </dialog>
  );
};

export default UserSearchModal;
