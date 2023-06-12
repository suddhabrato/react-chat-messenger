const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authMiddleware = require("./auth-middleware");

require("dotenv").config();

const corsOptions = {
  Credential: "true",
};

const app = express();
app.use(express.json());
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

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

app.listen(port, () => console.log("The server is running at PORT 4000"));
