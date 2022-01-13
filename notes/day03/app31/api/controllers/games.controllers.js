const gamesData = require("../data/games.json");

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
  const pageGames = gamesData.slice(offset, parseInt(offset) + parseInt(count));
  res.status(200).json(pageGames);
};

getOne = function (req, res) {
  console.log("Controller getOne invoked");
  const gameId = req.params.gameId;
  const theGame = gamesData[gameId];
  res.status(200).json(theGame);
};

addOne = function (req, res) {
  console.log("addOne");
  console.log(req.body);
  res.status(200).json(req.body);
};

module.exports = {
  getAll,
  getOne,
  addOne,
};
