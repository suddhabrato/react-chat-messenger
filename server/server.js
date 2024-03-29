const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const SocketServer = require("./socketServer");

require("dotenv").config();

const corsOptions = {
  Credential: "true",
};

const app = express();
app.use(express.json());
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  SocketServer(socket, io);
});

//dummy route for keeping API UP
app.get("/test", async (req, res) => {
  res.send("Server up & running");
});

app.use("/api/v1/user/", require("./routes/UserRouter"));
app.use("/api/v1/conversations", require("./routes/ConversationRouter"));

const URI = process.env.DB_URL;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"));

const port = process.env.PORT || 8080;

http.listen(port, () => console.log("Listening on PORT", port));
