require("dotenv").config();

const path = require("path");
const express = require("express");
require("./api/data/db");
const routes = require("./api/routes");

const app = express();

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
