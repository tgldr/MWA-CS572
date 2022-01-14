const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAMES_MODEL);

getAll = function (req, res) {
  console.log("Reviews Controller getAll invoked");
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select("reviews")
    .exec(function (err, game) {
      console.log("Found reviews");
      res.status(200).json(game.reviews);
    });
};

getOne = function (req, res) {
  console.log("Publisher Controller getOne invoked");
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;

  Game.findById(gameId)
    .select("reviews")
    .findById(reviewId)
    .exec(function (err, game) {
      console.log("found reviews publisher for game", game);
      res.status(200).json(game.reviews.id(reviewId));
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
