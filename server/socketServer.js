let users = [];

const SocketServer = (socket, io) => {
  socket.on("joinUser", (id) => {
    users.push({ id, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
  });

  socket.on("addMessage", (msg) => {
    const recipientUsers = users.filter((user) =>
      msg.recipients.includes(user.id)
    );

    recipientUsers.forEach((user) =>
      io.to(`${user.socketId}`).emit("addMessageToClient", msg)
    );
  });
};

module.exports = SocketServer;
