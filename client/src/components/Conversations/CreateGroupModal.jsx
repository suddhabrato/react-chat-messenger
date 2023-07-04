import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  closeGroupModal,
  openSearchModal,
  setSearchText,
} from "../../redux/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import { getSearchUsers } from "../../redux/actions/userActions";
import UserSearchItem from "./UserSearchItem";
import { showModal } from "./UserSearchModal";
import { createNewGroupConversation } from "../../redux/actions/conversationActions";
import useMediaQuery from "../../hooks/useMediaQuery";

// eslint-disable-next-line react-refresh/only-export-components
export const showGroupModal = () => {
  window.new_group_convo_modal.showModal();
};

const CreateGroupModal = () => {
  const buttonRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.user.searchText);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const searchResults = useSelector((state) => state.user.searchResults);
  const isGroupModalOpen = useSelector((state) => state.user.newGroupModalOpen);
  const [participants, setParticipants] = useState([]);
  const [title, setTitle] = useState("");
  const user = useSelector((state) => state.auth.user);
  const isSubmitting = useSelector(
    (state) => state.conversation.creatingNewGroupConversation
  );

  useEffect(() => {
    dispatch(clearSearch());
    setParticipants([]);
    setTitle("");
    if (searchRef.current && isGroupModalOpen && isDesktop)
      searchRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroupModalOpen, isDesktop, isSubmitting]);

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

  const addParticipant = (participant) => {
    if (!participants.find((item) => item._id === participant._id)) {
      setParticipants((prev) => [...prev, participant]);
    }
  };

  const removeParticipant = (participant) => {
    if (participants.find((item) => item._id === participant._id))
      setParticipants((prev) =>
        prev.filter((item) => item._id !== participant._id)
      );
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (!title.trim()) return console.log("Title cannot be empty");
    if (participants.length === 0)
      return console.log("Cannot create group with no members");
    let recepients = participants;
    if (!participants.find((item) => item._id === user._id))
      recepients.push({
        _id: user?._id,
        avatar: user?.avatar,
        username: user?.username,
        displayname: user?.displayname,
      });
    recepients = recepients.map((recepient) => recepient._id);

    dispatch(createNewGroupConversation({ participants: recepients, title }));

    setTimeout(() => {
      buttonRef.current && buttonRef.current.click();
    }, 1500);
  };

  return (
    <dialog id="new_group_convo_modal" className="modal">
      <form method="dialog" className="modal-box max-h-[90vh]">
        <button
          disabled={isSubmitting}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => dispatch(closeGroupModal())}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Create new group conversation</h3>
        <p className="mt-4 mb-2">
          <button
            disabled={isSubmitting}
            onClick={() => {
              showModal();
              dispatch(openSearchModal());
              dispatch(closeGroupModal());
            }}
            className="link"
          >
            Click Here
          </button>{" "}
          to go back and message users individually
        </p>

        <div className="form-control w-full my-2">
          <label className="label">
            <span className="label-text">
              What do you want to name your group?
            </span>
          </label>
          <input
            disabled={isSubmitting}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="group_name"
            type="text"
            placeholder="Type your group name here..."
            className="input input-bordered w-full text-sm focus:outline-none focus:border-neutral-500"
          />
        </div>
        <div className="w-full flex flex-wrap gap-2 my-2">
          <p>Participants:</p>
          {participants.map((participant) => (
            <div key={participant._id} className="badge badge-lg badge-outline">
              <div className="avatar mr-1">
                <div className="w-4 rounded-full">
                  <img src={participant.avatar} referrerPolicy="no-referrer" />
                </div>
              </div>
              @{participant.username}
              <div
                onClick={() => removeParticipant(participant)}
                className="btn btn-xs btn-neutral btn-circle ml-1 h-4 w-4 min-h-[1rem]"
              >
                <svg
                  className="w-3 h-3"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <label className="label">
          <span className="label-text">Search for participants to add</span>
        </label>
        <div className="join w-full">
          <input
            disabled={isSubmitting}
            ref={searchRef}
            className="input input-bordered join-item w-full text-sm focus:outline-none focus:border-neutral-500"
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
                group={true}
                addParticipant={addParticipant}
                removeParticipant={removeParticipant}
                key={searchUser._id}
                id={searchUser._id}
                avatar={searchUser.avatar}
                selected={participants.find(
                  (item) => item._id === searchUser._id
                )}
                username={searchUser.username}
                displayname={searchUser.displayname}
              />
            ))}
          </ul>
        )}
        <div className="w-full flex justify-end mt-4">
          <div
            onClick={handleSubmit}
            className={`btn btn-neutral ${isSubmitting ? "btn-disabled" : ""}`}
          >
            Create Group
          </div>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button
          ref={buttonRef}
          disabled={isSubmitting}
          onClick={() => dispatch(closeGroupModal())}
        >
          close
        </button>
      </form>
    </dialog>
  );
};

export default CreateGroupModal;
