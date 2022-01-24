const dbConnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

getAll = function (req, res) {
  console.log("Controller getAll invoked");
  let count = 6;
  let offset = 0;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = req.query.count > 9 ? 9 : parseInt(req.query.count);
  }
  const db = dbConnection.get();

  const gamesCollection = db.collection(process.env.DB_GAMES);
  gamesCollection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function (error, games) {
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

  if (
    req.body &&
    req.body.title &&
    req.body.price &&
    req.body.minPlayers &&
    req.body.minAge
  ) {
    if (req.body.minPlayers < 1 || req.body.minPlayers > 11) {
      res
        .status(400)
        .json({ error: "Minimum players must be between 1 to 11" });
    }
    if (req.body.minAge < 6 || req.body.minAge > 99) {
      res.status(400).json({ error: "Minimum age must be between 6 to 99" });
    }

    const newGame = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      minPlayers: req.body.minPlayers,
      minAge: req.body.minAge,
    };
    gamesCollection.insertOne(newGame, function (err, insertedGame) {
      console.log("inserted", insertedGame);
      res.status(201).json(insertedGame);
    });
  } else {
    console.log("Missing some fields");
    res.status(400).json({ error: "Required data missing" });
  }
};

removeOne = function (req, res) {
  console.log("removeOne invoked");
  const gameId = req.params.gameId;
  const db = dbConnection.get();
  const gamesCollection = db.collection(process.env.DB_GAMES);

  if (gameId) {
    gamesCollection.deleteOne(
      { _id: ObjectId(gameId) },
      function (err, deletedGame) {
        console.log("deleted", deletedGame);
        res.status(200).json({ message: "Succesfully Deleted" });
      }
    );
  } else {
    console.log("Wrong Game Id");
    res.status(404).json({ error: "Wrong Game ID" });
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  removeOne,
};
