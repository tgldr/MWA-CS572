const express = require("express");

const schoolControllers = require("../controllers/school.controllers");
const router = express.Router();

router.route("/students").get(schoolControllers.getAll);
router.route("/students/:studentId").get(schoolControllers.getOne);

module.exports = router;
