const express = require("express");

const moviesContoller = require("../controllers/movies.controllers");
const router = express.Router();

router.route("/movies").get(moviesContoller.getAll);
router.route("/movies/:movieId").get(moviesContoller.getOne);

module.exports = router;
