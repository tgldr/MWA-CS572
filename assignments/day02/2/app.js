require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.post("/index", function (req, res) {
  const html = fs.readFileSync(path.join(__dirname, "public", "index.html"));
  res.status(200).send({ data: html.toString() });
});

app.post("/page1", function (req, res) {
  const html = fs.readFileSync(path.join(__dirname, "public", "page1.html"));
  res.status(200).send({ data: html.toString() });
});

app.post("/page2", function (req, res) {
  const html = fs.readFileSync(path.join(__dirname, "public", "page2.html"));
  res.status(200).send({ data: html.toString() });
});

const server = app.listen(process.env.PORT, function () {
  console.log("Listening to port", process.env.PORT);
});
