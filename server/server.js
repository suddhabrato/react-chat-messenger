const express = require("express");
const cors = require("cors");
const authMiddleware = require("./auth-middleware");

const app = express();
app.use(cors());

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

app.use("/api/v1", authMiddleware);

app.post("/api/v1/conversations", (request, response) => {
  return response.send({ data });
});

app.listen(4000, () => console.log("The server is running at PORT 4000"));
