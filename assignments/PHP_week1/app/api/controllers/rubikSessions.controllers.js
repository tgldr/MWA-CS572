const mongoose = require("mongoose");
const RubikSession = mongoose.model(process.env.DB_RUBIKSESSIONS_MODEL);

getAll = function (req, res) {
  let count = parseInt(process.env.DEFAULT_FIND_LIMIT);
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
  const maxCount = parseInt(process.env.MAX_FIND_LIMIT);

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (count > maxCount) {
    console.log("Count is greater than maximum limit");
    res
      .status(400)
      .json({ message: "Cannot exceed count limit of: " + maxCount });
    return;
  }

  if (isNaN(offset) || isNaN(count)) {
    console.log("offset || count are not a number");
    res
      .status(400)
      .json({ message: "QueryString offset and count should be digits" });
    return;
  }

  RubikSession.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, rubikSessions) {
      if (err) {
        console.log("error");
        res.status(500).json(err);
      } else {
        console.log("Found RubikSessions");
        res.status(200).json(rubikSessions);
      }
    });
};

getOne = function (req, res) {
  const sessionId = req.params.sessionId;

  if (!mongoose.isValidObjectId(sessionId)) {
    console.log("Request param sessionId is not a valid ID");
    res
      .status(400)
      .json({ message: "Request param sessionId is not a valid ID" });
    return;
  }

  RubikSession.findById(sessionId).exec(function (err, rubikSession) {
    const response = {
      status: 200,
      message: rubikSession,
    };
    if (err) {
      console.log("Error founding rubikSession");
      response.status = 500;
      response.message = err;
    } else if (!rubikSession) {
      response.status = 404;
      response.message = "SessionId Not found";
    }

    res.status(response.status).json(response.message);
  });
};

deleteOne = function (req, res) {
  const sessionId = req.params.sessionId;

  if (!mongoose.isValidObjectId(sessionId)) {
    console.log("Request param sessionId is not a valid ID");
    res
      .status(400)
      .json({ message: "Request param sessionId is not a valid ID" });
    return;
  }

  RubikSession.deleteOne({ _id: sessionId }).exec(function (err) {
    const response = {
      status: 200,
      message: "Session deleted successfully",
    };

    if (err) {
      console.log("Error while deleting rubikSession");
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json({ message: response.message });
  });
};

addOne = function (req, res) {
  console.log("POST new RubikSession");

  const newRubikSession = {
    title: req.body.title,
    solves: [],
  };

  RubikSession.create(newRubikSession, function (err, rubikSession) {
    const response = {
      status: 201,
      message: rubikSession,
    };

    if (err) {
      console.log("Error creating new rubikSession", err);
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

updateOne = function (req, res) {
  const sessionId = req.params.sessionId;

  if (!mongoose.isValidObjectId(sessionId)) {
    console.log("Request param sessionId is not a valid ID");
    res
      .status(400)
      .json({ message: "Request param sessionId is not a valid ID" });
    return;
  }

  RubikSession.findById(sessionId).exec(function (err, rubikSession) {
    const response = {
      status: 201,
      message: rubikSession,
    };

    rubikSession.title = req.body.title;
    if (err) {
      console.log("Error founding rubikSession");
      response.status = 500;
      response.message = err;
    } else if (!rubikSession) {
      response.status = 404;
      response.message = "SessionId Not found";
    }

    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
