const express = require("express");

const gamesControllers = require("../controllers/games.controllers");
const router = express.Router();

router.route("/games").get(gamesControllers.getAll);

module.exports = router;
