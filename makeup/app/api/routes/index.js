const express = require("express");

const inspectionsController = require("../controllers/inspections.controllers");
const router = express.Router();

router.route("/inspections").get(inspectionsController.getAll);

router
  .route("/inspection/:inspectionId")
  .get(inspectionsController.getOne)
  .delete(inspectionsController.deleteOne);

module.exports = router;
