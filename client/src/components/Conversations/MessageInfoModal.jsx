import { useDispatch, useSelector } from "react-redux";
import { clearCurrentMessage } from "../../redux/slices/userSlice";
import { formatRelativeDateSeen } from "../../utils/DateTimeHelper";

/* eslint-disable react-refresh/only-export-components */
export const showMessageInfoModal = () => {
  window.message_info_modal.showModal();
};
const options = { hour: "2-digit", minute: "2-digit" };

const MessageInfoModal = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.currentMessageInfo);

  return (
    <dialog id="message_info_modal" className="modal">
      <form method="dialog" className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => dispatch(clearCurrentMessage())}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Message Info</h3>
        <div className="max-h-36 overflow-y-auto my-2 bg-base-200 rounded-box py-1 px-2">
          <div className="chat chat-end">
            {message?.media.length > 0 ? (
              <div className="chat-bubble">
                {message?.media?.map((image) => (
                  <img
                    key={image.publicId}
                    className="object-cover rounded-xl my-2"
                    src={image.imageUrl}
                  />
                ))}
                <div className="flex break-all">{message?.text}</div>
              </div>
            ) : (
              <div className="chat-bubble">{message?.text}</div>
            )}
          </div>
        </div>
        <p className="chat-footer opacity-50 text-end">
          Sent:{" "}
          {`${formatRelativeDateSeen(
            new Date(message?.createdAt)
          )} at ${new Date(message?.createdAt).toLocaleTimeString(
            "en-US",
            options
          )}`}
        </p>
        <p>Read by</p>
        <ul className="menu bg-base-200 w-full rounded-box max-h-60 flex-nowrap overflow-y-auto mt-2">
          {message?.seen?.map(
            (seenUser) =>
              seenUser.viewer._id !== message.author._id && (
                <div key={seenUser.viewer._id}>
                  <li>
                    <div className="flex gap-3 justify-start w-full h-full p-1 pointer-events-none select-text">
                      <div>
                        <div className={`avatar`}>
                          <div className="w-12 rounded-full">
                            <img
                              src={seenUser.viewer.avatar}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-full items-center justify-center overflow-x-hidden">
                        <h3 className="text-md w-full truncate">
                          {seenUser.viewer.displayname}
                        </h3>
                        <p className="text-sm h-6 truncate w-full font-light">
                          {`${formatRelativeDateSeen(
                            new Date(seenUser.viewedAt)
                          )} at ${new Date(
                            seenUser.viewedAt
                          ).toLocaleTimeString("en-US", options)}`}
                        </p>
                      </div>
                    </div>
                  </li>
                  <div className="divider my-0 px-4 -mt-0.5 h-auto"></div>
                </div>
              )
          )}
        </ul>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => dispatch(clearCurrentMessage())}>close</button>
      </form>
    </dialog>
  );
};

export default MessageInfoModal;
