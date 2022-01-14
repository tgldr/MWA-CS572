const dbConnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAMES_MODEL);

getAll = function (req, res) {
  console.log("Controller getAll invoked");
  let count = 5;
  let offset = 0;

  if (req.query && req.query.offset) {
    offset = req.query.offset;
  }
  if (req.query && req.query.count) {
    count = req.query.count;
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

  const db = dbConnection.get();
  const gamesCollection = db.collection(process.env.DB_GAMES);
  gamesCollection.findOne({ _id: ObjectId(gameId) }, function (error, game) {
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
