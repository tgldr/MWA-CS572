require("dotenv").config();
const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function () {
  console.log("Listening to port", process.env.PORT);
});
