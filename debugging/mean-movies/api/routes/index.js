const express = require("express");

const moviesController = require("../controllers/movies.controllers");
const router = express.Router();

router.route("/movies").get(moviesController.getAll);

router
  .route("/movie/:movieId")
  .get(moviesController.getOne)
  .delete(moviesController.deleteOne);

module.exports = router;
