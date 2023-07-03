/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connectSocket, disconnectSocket, getSocket } from "./socketService";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, removeMessage } from "./redux/slices/conversationSlice";

const SocketClient = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      connectSocket(user._id); // Connect the socket if the user is logged in
    } else {
      disconnectSocket(); // Disconnect the socket if the user is not logged in
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("joinUser"); // Remove any event listeners if necessary
      }
    };
  }, [user]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("addMessageToClient", (msg) => {
        dispatch(addMessage(msg));
      });
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("addMessageToClient");
      }
    };
  }, [user]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("deleteMessageFromClient", (msg) => {
        dispatch(removeMessage(msg));
      });
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("deleteMessageFromClient");
      }
    };
  }, [user]);

  return;
};

export default SocketClient;
