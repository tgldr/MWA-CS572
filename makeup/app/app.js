require("dotenv").config();
const path = require("path");
const express = require("express");
require("./api/data/db.js");
const routes = require("./api/routes");

const app = express();

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Controll-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,DELETE");
  next();
});

app.use("/api", routes);

const server = app.listen(process.env.PORT, function () {
  console.log("listening:", server.address().port);
});
