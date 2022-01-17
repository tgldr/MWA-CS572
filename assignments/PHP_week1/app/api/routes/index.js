const express = require("express");

const rubikSessionsControllers = require("../controllers/rubikSessions.controllers");
const solveControllers = require("../controllers/solve.controllers");
const router = express.Router();

router
  .route("/sessions")
  .get(rubikSessionsControllers.getAll)
  .post(rubikSessionsControllers.addOne);

router
  .route("/sessions/:sessionId")
  .get(rubikSessionsControllers.getOne)
  .delete(rubikSessionsControllers.deleteOne);

router.route("/sessions/:sessionId/solve").post(solveControllers.addOne);

module.exports = router;
