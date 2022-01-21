require("dotenv").config();
const path = require("path");
const express = require("express");
require("./api/data/db");
const routes = require("./api/routes");

const app = express();

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", routes);

const server = app.listen(process.env.PORT, function () {
  console.log("listening port", server.address().port);
});
