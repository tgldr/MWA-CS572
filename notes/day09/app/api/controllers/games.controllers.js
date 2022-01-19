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

const _updateOne = function (req, res, updateGameCallBack) {
  const gameId = req.params.gameId;

  console.log("partialUpdateOne controller");

  if (!mongoose.isValidObjectId(gameId)) {
    console.log("Request param gameID is not a valid ID");
    res.status(400).json({ message: "Request param gameID is not a valid ID" });
    return;
  }

  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 201,
      message: game,
    };
    if (err) {
      console.log("Error founding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = "GameID Not found";
    }

    if (response.status !== 201) {
      res.status(response.status).json(response.message);
    } else {
      updateGameCallBack(req, res, game, response);
    }
  });
};

const _fullUpdateOne = function (req, res, game, response) {
  game.title = req.body.title;
  game.year = req.body.year;
  game.rate = req.body.rate;
  game.price = req.body.price;
  game.minPlayers = req.body.minPlayers;
  game.maxPlayers = req.body.maxPlayers;
  game.minAge = req.body.minAge;
  game.designers = req.body.designer;
  game.reviews = [];
  game.publisher = { name: "NoName" };
  _saveOneGame(res, response, game);
};

const _partialUpdateOne = function (req, res, game, response) {
  if (req.body.title) {
    game.title = req.body.title;
  }
  if (req.body.year) {
    game.year = req.body.year;
  }
  if (req.body.rate) {
    game.rate = req.body.rate;
  }
  if (req.body.price) {
    game.price = req.body.price;
  }
  if (req.body.minPlayers) {
    game.minPlayers = req.body.minPlayers;
  }
  if (req.body.maxPlayers) {
    game.maxPlayers = req.body.maxPlayers;
  }
  if (req.body.minAge) {
    game.minAge = req.body.minAge;
  }
  if (req.body.designers) {
    game.designers = req.body.designers;
  }
  if (req.body.reviews) {
    game.reviews = req.body.reviews;
  }
  if (req.body.publisher) {
    game.publisher = req.body.publisher;
  }

  _saveOneGame(res, response, game);
};

const _saveOneGame = function (res, response, game) {
  game.save(function (err, updatedGame) {
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
};

getAll = function (req, res) {
  console.log("Controller getAll invoked");
  let count = parseInt(process.env.DEFAULT_FIND_LIMIT);
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
  const maxCount = parseInt(process.env.MAX_FIND_LIMIT);

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

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      if (err) {
        console.log("error");
        res.status(500).json(err);
      } else {
        console.log("Found games");
        res.status(200).json(games);
      }
    });
};

getOne = function (req, res) {
  const gameId = req.params.gameId;

  if (!mongoose.isValidObjectId(gameId)) {
    console.log("Request param gameID is not a valid ID");
    res.status(400).json({ message: "Request param gameID is not a valid ID" });
    return;
  }

  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("Error founding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = "GameID Not found";
    }

    res.status(response.status).json(response.message);
  });
};

addOne = function (req, res) {
  console.log("POST new game");
  console.log(req.body);

  const newGame = {
    title: req.body.title,
    year: req.body.year,
    price: req.body.price,
    rate: req.body.rate,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    minAge: req.body.minAge,
    designers: [req.body.designer],
    publisher: { name: "NoName" },
    reviews: [],
  };

  Game.create(newGame, function (err, game) {
    const response = {
      status: 201,
      message: game,
    };

    if (err) {
      console.log("Error creating new game", err);
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

const fullUpdateOne = function (req, res) {
  console.log("Full update controller called");
  _updateOne(req, res, _fullUpdateOne);
};

const partialUpdateOne = function (req, res) {
  console.log("Partial update controller called");
  _updateOne(req, res, _partialUpdateOne);
};

module.exports = {
  getAll,
  getOne,
  addOne,
  fullUpdateOne,
  partialUpdateOne,
};
