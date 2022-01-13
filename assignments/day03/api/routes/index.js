const express = require("express");

const gamesControllers = require("../controllers/games.controllers");
const utilsControllers = require("../controllers/utils.controllers");
const schoolControllers = require("../controllers/school.controllers");
const router = express.Router();

router
  .route("/games")
  .get(gamesControllers.getAll)
  .post(gamesControllers.addOne);

router.route("/game/:gameId").get(gamesControllers.getOne);
router.route("/multiply/:number").get(utilsControllers.multiply);

router.route("/students").get(schoolControllers.getAll);
router.route("/students/:studentId").get(schoolControllers.getOne);

module.exports = router;
