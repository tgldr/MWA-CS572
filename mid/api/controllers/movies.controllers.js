const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const Movie = mongoose.model(process.env.MOVIE_MODEL);

getAll = function (req, res) {
  console.log("getAll");

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
    console.log("Count is greater than max limit");
    res.status(400).json({
      message: "Cannot exceed count limit of " + maxCount,
    });
    return;
  }

  if (isNaN(offset) || isNaN(count)) {
    console.log("offset or count is not a number");
    res.status(400).json({
      message: "QueryString offset and count should be digits",
    });
  }

  Movie.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, movies) {
      const response = {
        status: 200,
        message: movies,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      }

      res.status(response.status).json(response.message);
    });
};

getOne = function (req, res) {
  const movieId = req.params.movieId;

  if (!mongoose.isValidObjectId(movieId)) {
    console.log("Request param movieID is not a valid ID");
    res
      .status(400)
      .json({ message: "Request param movieID is not a valid ID" });
    return;
  }

  Movie.find(movieId).exex(function (err, movie) {
    const response = {
      status: 200,
      message: movie,
    };

    if (err) {
      console.log("Error founding movie");
      response.status = 500;
      response.message = err;
    } else if (!movie) {
      response.status = 404;
      response.message = "Movie Not Found";
    }

    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAll,
  getOne,
};
