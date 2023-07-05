/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connectSocket, disconnectSocket, getSocket } from "./socketService";
import { useDispatch, useSelector } from "react-redux";
import {
  addGroupConversation,
  addMessage,
  removeMessage,
  updateSeenMessage,
} from "./redux/slices/conversationSlice";
import { setActiveUsers, subscribeToUsers } from "./redux/slices/userSlice";

const SocketClient = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const conversations = useSelector(
    (state) => state.conversation.conversationsList
  );

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

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("addGroupConversationToClient", (conversation) => {
        dispatch(addGroupConversation(conversation));
      });
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("addGroupConversationToClient");
      }
    };
  }, [user]);

  const getUserstoSubscribe = (conversations) => {
    const participantsSet = new Set();
    conversations.forEach((conversation) => {
      conversation.participants.forEach((participant) =>
        participantsSet.add(participant._id)
      );
    });

    dispatch(subscribeToUsers(Array.from(participantsSet)));
  };

  useEffect(() => {
    getUserstoSubscribe(conversations);
    const interval = setInterval(() => {
      getUserstoSubscribe(conversations);
    }, 10000);
    return () => clearInterval(interval);
  }, [conversations]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("sendActiveStatusToClient", (activeUsers) => {
        dispatch(setActiveUsers(activeUsers));
      });
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("sendActiveStatusToClient");
      }
    };
  }, [user]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("updateSeenOnClient", (msg) => {
        dispatch(updateSeenMessage(msg));
      });
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("updateSeenOnClient");
      }
    };
  }, [user]);

  return;
};

export default SocketClient;
