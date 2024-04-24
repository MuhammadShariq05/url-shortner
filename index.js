const express = require("express");
const path = require("path");
const urlroute = require("./routes/url");
const staticRoute = require("./routes/staticrouter");
const { connectToMongo } = require("./connect/connecter");

const app = express();
const PORT = 4000;

connectToMongo("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb connected")
);

app.set("view engine", "ejs");
app.set("views", path.join("./views"));

app.use(express.json());
app.use(express.urlencoded({ extented: false }));

app.use("/url", urlroute);
app.use("/", staticRoute);
app.get("/:shortId", urlroute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
