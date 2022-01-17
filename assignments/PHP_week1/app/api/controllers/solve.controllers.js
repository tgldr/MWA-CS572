const mongoose = require("mongoose");
const RubikSession = mongoose.model(process.env.DB_RUBIKSESSIONS_MODEL);

_addSolve = function (req, res, rubikSession) {
  if (!req.body.scramble || !req.body.time) {
    res.status(500).json({ message: "Scramble or Time field missing" });
  }

  if (req.body.time) {
    time = parseInt(req.body.time);
  }

  if (isNaN(time)) {
    console.log("time is not a number");
    res.status(400).json({ message: "Time should be number" });
    return;
  }

  rubikSession.solves.push({
    scramble: req.body.scramble,
    time,
    solveStatus,
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

module.exports = {
  addOne,
};
