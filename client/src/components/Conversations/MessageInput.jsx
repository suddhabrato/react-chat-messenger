import { useDispatch, useSelector } from "react-redux";
import {
  createNewMessage,
  uploadImages,
} from "../../redux/actions/conversationActions";
import { setMessageText } from "../../redux/slices/conversationSlice";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import ImageUploadCarousel from "./ImageUploadCarousel";

const MessageInput = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const inputRef = useRef(null);
  const mediaUploadRef = useRef(null);
  const dispatch = useDispatch();
  const isSubmitting = useSelector(
    (state) => state.conversation.sendingMessage
  );
  const currentConversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const isLoading = useSelector((state) => state.conversation.isLoading);
  const messageText = useSelector((state) => state.conversation.newMessageText);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    dispatch(setMessageText(e.target.value));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(Array.from(files));
    if (files.length > 0) {
      const newSelectedFiles = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(2),
        file: file,
        previewUrl: URL.createObjectURL(file),
      }));

      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...newSelectedFiles,
      ]);
    } else {
      setSelectedFiles([]);
    }
  };

  useEffect(() => {
    console.log("s", selectedFiles);
  }, [selectedFiles]);

  useEffect(() => {
    setSelectedFiles([]);
    if (mediaUploadRef.current) mediaUploadRef.current.value = null;
    if (!isSubmitting && inputRef.current && isDesktop)
      inputRef.current.focus();
  }, [isSubmitting, currentConversation, isLoading, isDesktop, mediaUploadRef]);

  const handleSubmit = async () => {
    if (!messageText.trim() && selectedFiles.length === 0)
      return console.log("Empty Message");
    if (currentConversation) {
      let uploadedImages = [];
      if (selectedFiles.length > 0) {
        uploadedImages = await uploadImages(selectedFiles);
        console.log(uploadedImages);
        setSelectedFiles([]);
      }
      const body = {
        recipients: currentConversation.participants.map(
          (participant) => participant._id
        ),
        convId: currentConversation?._id,
        text: messageText.trim(),
        media: uploadedImages,
        type: currentConversation?.type || "Individual",
      };
      dispatch(createNewMessage({ data: body }));
    }
  };

  const handleCancel = (id) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.id !== id)
    );
  };

  return (
    <div className="w-full bg-base-300 flex p-2 items-center justify-center gap-0 relative">
      {selectedFiles?.length > 0 && (
        <ImageUploadCarousel
          files={selectedFiles}
          handleCancel={handleCancel}
        />
      )}
      <button
        disabled={isSubmitting}
        className="btn btn-ghost btn-circle"
        onClick={() => mediaUploadRef.current && mediaUploadRef.current.click()}
      >
        <input
          disabled={isSubmitting}
          accept="image/*"
          multiple
          type="file"
          ref={mediaUploadRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <svg
          className="w-7 h-7"
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
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </button>

      <input
        autoFocus={isDesktop}
        type="text"
        placeholder="Type a message"
        ref={inputRef}
        disabled={isSubmitting}
        value={messageText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="input focus:border-0 mx-2 w-full input-md focus:outline-0 rounded-full input-ghost bg-base-200 hover:bg-base-100 focus:bg-base-100 transition-all duration-300"
      />
      <button
        disabled={isSubmitting}
        className="btn btn-ghost btn-circle"
        onClick={handleSubmit}
      >
        <svg
          className="w-6 h-6"
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
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
