const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAMES_MODEL);

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

  const query = {
    "publisher.location.coordinates": {
      $near: {
        $geometry: point,
        $maxDistance: distance,
        $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10),
      },
    },
  };

  Game.find(query).exec(function (err, games) {
    console.log("Found games with location");
    res.status(200).json(games);
  });
};

getAll = function (req, res) {
  console.log("Controller getAll invoked");
  let count = process.env.DEFAULT_FIND_LIMIT;
  let offset = process.env.DEFAULT_FIND_OFFSET;

  if (req.query && req.query.lat && req.query.lng) {
    _runGeoQuery(req, res);
    return;
  }

  if (req.query && req.query.offset) {
    offset = req.query.offset;
  }
  if (req.query && req.query.count) {
    count = req.query.count;
  }

  if (isNaN(offset) || isNaN(count)) {
    console.log("offset || count are not a number");
    res
      .status(400)
      .json({ message: "QueryString offset and count should be digits" });
    return;
  }

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games");
      res.status(200).json(games);
    });
};

getOne = function (req, res) {
  console.log("Controller getOne invoked");
  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
    console.log("found game");
    res.status(200).json(game);
  });
};

addOne = function (req, res) {
  const db = dbConnection.get();
  const gamesCollection = db.collection(process.env.DB_GAMES);

  if (req.body && req.body.title && req.body.price) {
    const newGame = {
      title: req.body.title,
      price: parseFloat(req.body.price),
    };
    gamesCollection.insertOne(newGame, function (err, insertedGame) {
      console.log("inserted", insertedGame.ops);
      res.status(201).json(insertedGame.ops);
    });
  } else {
    console.log("Missing some fields");
    res.status(400).json({ error: "Required data missing" });
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
};
