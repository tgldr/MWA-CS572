const express = require("express");

const jobsController = require("../controllers/jobs.controllers");
const router = express.Router();

router.route("/jobs").get(jobsController.getAll).post(jobsController.addOne);

router.route("/jobs/:jobId/review").post(jobsController.addReview);

module.exports = router;
