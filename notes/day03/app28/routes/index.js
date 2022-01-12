const express = require("express");

const router = express.Router();

router
  .route("/json")
  .get(function (req, res) {
    console.log("JSON request");
    res.status(200).send({ JSON_DATA: true });
  })
  .post(function (req, res) {
    console.log("JSON request");
    res.status(200).send({ POST_JSON_DATA: true });
  });

module.exports = router;
