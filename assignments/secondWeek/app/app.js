require("dotenv").config();

const path = require("path");
const express = require("express");
require("./api/data/dbconnection").open();
const routes = require("./api/routes");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();

app.use("/css", function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

const server = app.listen(process.env.PORT, function () {
  console.log("App working on ", process.env.PORT);
});
