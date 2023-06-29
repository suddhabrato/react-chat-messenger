import { useDispatch, useSelector } from "react-redux";
import { clearSearch, setSearchText } from "../../redux/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import { getSearchUsers } from "../../redux/actions/userActions";
import UserSearchItem from "./UserSearchItem";

// eslint-disable-next-line react-refresh/only-export-components
export const showModal = () => {
  window.new_message_modal.showModal();
};

const UserSearchModal = () => {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.user.searchText);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const searchResults = useSelector((state) => state.user.searchResults);

  useEffect(() => {
    dispatch(clearSearch());
    if (searchRef.current && searchRef.current) searchRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <form method="dialog" className="modal-box max-h-[60vh]">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">Create new conversation</h3>
        <p className="py-4">
          Search for the user you want to message or
          <br />
          <span className="link">Click Here</span> to create a group
          conversation
        </p>

        <div className="join w-full">
          <input
            autoFocus
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
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UserSearchModal;
