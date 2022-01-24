const express = require("express");

const gamesControllers = require("../controllers/games.controllers");
const router = express.Router();

router
  .route("/games")
  .get(gamesControllers.getAll)
  .post(gamesControllers.addOne);

router
  .route("/game/:gameId")
  .get(gamesControllers.getOne)
  .delete(gamesControllers.removeOne);

module.exports = router;
