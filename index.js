const express = require("express");
const urlroute = require("./routes/url");
const { connectToMongo } = require("./connect/connecter");

const app = express();
const PORT = 4000;

connectToMongo("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb connected")
);

app.use(express.json());
app.use("/url", urlroute);
app.get("/:shortId", urlroute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
