const mongoose = require("mongoose");
const Theater = mongoose.model(process.env.THEATER_MODEL);

const _runGeoQuery = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);

  let distance = parseFloat(process.env.GEO_SEARCH_MAX_DIST, 10);
  if (req.query.dist) {
    distance = parseFloat(req.query.dist);
  }

  const point = {
    type: "Point",
    coordinates: [lng, lat],
  };

  console.log(lng);
  console.log(lat);
  console.log(distance);

  const query = {
    "theaters.location.geo.coordinates": {
      $near: {
        $geometry: point,
        $maxDistance: distance,
        $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10),
      },
    },
  };

  Theater.find(query).exec(function (err, theaters) {
    console.log("Found theaters with location", theaters);
    res.status(200).json(theaters);
  });
};

const getAll = function (req, res) {
  let count = parseInt(process.env.DEFAULT_FIND_COUNT);
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
  const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT);

  if (req.query && req.query.lat && req.query.lng) {
    _runGeoQuery(req, res);
    return;
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (count > maxCount) {
    console.log("Count is greater than limit");
    res.status(400).json({
      message: "Cannot exceed count limit of" + maxCount,
    });
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: "QueryString offset and count should be digits" });
    return;
  }
  let query;

  if (req.query && req.query.state) {
    query = { "location.address.state": req.query.state.toString() };
  }

  Theater.find(query)
    .skip(offset)
    .limit(count)
    .exec(function (err, theaters) {
      const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: theaters,
      };
      if (err) {
        response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

const getAllStates = function (req, res) {
  Theater.find({}, { "location.address.state": 1 })
    .sort({
      "location.address.state": 1,
    })
    .distinct("location.address.state")
    .exec(function (err, theaters) {
      const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: theaters,
      };
      if (err) {
        response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  const theaterId = req.params.theaterId;
  Theater.findById(theaterId).exec(function (err, theater) {
    const response = {
      status: parseInt(process.env.REST_API_OK, 10),
      message: theater,
    };
    if (err) {
      response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
      response.message = err;
    } else if (!theater) {
      response.status = parseInt(
        process.env.REST_API_RESOURCE_NOT_FOUND_ERROR,
        10
      );
      response.message = {
        message: process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE,
      };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAllStates: getAllStates,
  getAll: getAll,
  getOne: getOne,
};
