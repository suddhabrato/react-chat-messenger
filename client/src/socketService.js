import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  // Only connect if the user is logged in
  if (!socket && userId) {
    socket = io(import.meta.env.VITE_APP_SOCKET_URI);

    socket.on("connect", () => {
      console.log("Connected to Socket.io");
      socket.emit("joinUser", userId);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io");
    });
  }
};

export const disconnectSocket = () => {
  // Disconnect the socket if it's connected
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  // Return the socket instance
  return socket;
};

export const emitEvent = (eventName, data) => {
  socket.emit(eventName, data);
};
