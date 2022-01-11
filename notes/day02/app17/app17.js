require("dotenv").config();
const path = require("path");
const express = require("express");

const app = express();

// app.get("/", function (req, res) {
//   console.log("get received");
//   res.status(404).send("Received your get request");
// });

app.get("/json", function (req, res) {
  console.log("JSON req received");
  res.status(200).send({ JSON_DATA: true });
});

app.get("/file", function (req, res) {
  console.log("File request receive");

  res.status(200).sendFile(path.join(__dirname, "app17.js"));
});

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function () {
  console.log(process.env.MSG_SERVER_START, server.address().port);
});
