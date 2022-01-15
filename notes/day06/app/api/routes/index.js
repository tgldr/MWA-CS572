const express = require("express");

const gamesControllers = require("../controllers/games.controllers");
const publisherControllers = require("../controllers/publisher.controllers");
const reviewsControllers = require("../controllers/reviews.controllers");
const router = express.Router();

router
  .route("/games")
  .get(gamesControllers.getAll)
  .post(gamesControllers.addOne);

router.route("/game/:gameId").get(gamesControllers.getOne);

router
  .route("/game/:gameId/publisher")
  .get(publisherControllers.getOne)
  .post(publisherControllers.addOne);
router.route("/game/:gameId/reviews").get(reviewsControllers.getAll);
router.route("/game/:gameId/reviews/:reviewId").get(reviewsControllers.getOne);

module.exports = router;
