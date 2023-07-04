let users = [];
const activeUsers = new Map();

const SocketServer = (socket, io) => {
  socket.on("joinUser", (id) => {
    users.push({ id, socketId: socket.id });
    activeUsers.set(id, true);
  });

  socket.on("disconnect", () => {
    const user = users.find((user) => user.socketId === socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    if (user) activeUsers.delete(user._id);
  });

  socket.on("addMessage", (msg) => {
    const recipientUsers = users.filter((user) =>
      msg?.savedMessage?.recipients.includes(user.id)
    );

    recipientUsers.forEach((user) =>
      io.to(`${user.socketId}`).emit("addMessageToClient", msg)
    );
  });

  socket.on("deleteMessage", ({ msg, conversation }) => {
    const recipientUsers = users.filter((user) =>
      msg.recipients.includes(user.id)
    );

    recipientUsers.forEach((user) =>
      io
        .to(`${user.socketId}`)
        .emit("deleteMessageFromClient", { msg, conversation })
    );
  });

  socket.on("addGroupConversation", (conversation) => {
    const convoparticipants = conversation.participants.map(
      (participant) => participant._id
    );
    const recipientUsers = users.filter((user) =>
      convoparticipants.includes(user.id)
    );

    recipientUsers.forEach((user) =>
      io
        .to(`${user.socketId}`)
        .emit("addGroupConversationToClient", conversation)
    );
  });

  socket.on("getActiveStatus", (subscribedUsers) => {
    const filteredActiveUsers = subscribedUsers.filter((subuser) =>
      activeUsers.get(subuser)
    );
    socket.emit("sendActiveStatusToClient", filteredActiveUsers);
  });
};

module.exports = SocketServer;
