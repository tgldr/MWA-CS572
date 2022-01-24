const mongoose = require("mongoose");
const RubikSession = mongoose.model(process.env.DB_RUBIKSESSIONS_MODEL);

_addSolve = function (req, res, rubikSession) {
  if (!req.body.scramble || !req.body.time) {
    res
      .status(500)
      .json({ message: "Scramble or Time or SolveStatus field missing" });
  }

  rubikSession.solves.push({
    scramble: req.body.scramble,
    time: req.body.time,
    solveStatus: req.body.solveStatus,
  });

  rubikSession.save(function (err, updatedSession) {
    const response = {
      status: 201,
      message: updatedSession,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

addOne = function (req, res) {
  const sessionId = req.params.sessionId;

  RubikSession.findById(sessionId)
    .select("solves")
    .exec(function (err, rubikSession) {
      const response = {
        status: 201,
        message: rubikSession,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!rubikSession) {
        response.status = 404;
        response.message = "SessionId not found:" + sessionId;
      }
      if (rubikSession) {
        _addSolve(req, res, rubikSession);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

deleteOne = function (req, res) {
  const sessionId = req.params.sessionId;
  const solveId = req.params.solveId;

  if (!mongoose.isValidObjectId(sessionId)) {
    console.log("Request param sessionId is not a valid ID");
    res
      .status(400)
      .json({ message: "Request param sessionId is not a valid ID" });
    return;
  }

  if (!mongoose.isValidObjectId(solveId)) {
    console.log("Request param solveId is not a valid ID");
    res
      .status(400)
      .json({ message: "Request param solveId is not a valid ID" });
    return;
  }

  RubikSession.findByIdAndUpdate(
    sessionId,
    {
      $pull: {
        solves: {
          _id: solveId,
        },
      },
    },
    function (err, rubikSession) {
      const response = {
        status: 200,
        message: rubikSession,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!rubikSession) {
        response.status = 404;
        response.message = "SessionId not found:" + sessionId;
      }

      res.status(response.status).json(response.message);
    }
  );
};

module.exports = {
  addOne,
  deleteOne,
};
