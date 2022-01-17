const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAMES_MODEL);

_addPublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.publisher.established = req.body.established;
  game.publisher.location.coordinates = [
    parseFloat(req.body.lng),
    parseFloat(req.body.lat),
  ];

  game.save(function (err, updatedGame) {
    const response = {
      status: 201,
      message: updatedGame,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

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
  console.log("Publisher Controller getOne invoked");
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      console.log("found game publisher for game", game);
      res.status(200).json(game.publisher);
    });
};

addOne = function (req, res) {
  console.log("Add Publisher Controller");
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      const response = {
        status: 201,
        message: game,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = "GameId not found:" + gameId;
      }
      if (game) {
        _addPublisher(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

module.exports = {
  getAll,
  getOne,
  addOne,
};
