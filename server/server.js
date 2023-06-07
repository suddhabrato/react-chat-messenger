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

const data = [
  {
    id: 1,
    name: "Harry Potter",
    image:
      "https://pmpub-catalogue.s3-eu-west-1.amazonaws.com/covers/web/9781781100240.jpg",
  },
  {
    id: 2,
    name: "Clean Code",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg",
  },
  {
    id: 3,
    name: "Javascript: The good parts",
    image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg",
  },
];

app.post("/api/v1/conversations", authMiddleware, (req, res) => {
  return res.send({ data });
});

app.use("/api/v1/user/", require("./routes/UserRouter"));

const URI = process.env.DB_URL;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("The server is running at PORT 4000"));
