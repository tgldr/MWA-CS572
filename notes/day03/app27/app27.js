require("dotenv").config();

const path = require("path");
const express = require("express");

const app = express();

app.use("/css", function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/json", function (req, res) {
  console.log("JSON request");
  res.status(200).send({ JSON_DATA: true });
});

const server = app.listen(process.env.PORT, function () {
  console.log("App working on ", process.env.PORT);
});
