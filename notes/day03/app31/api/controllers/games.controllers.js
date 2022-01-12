const gamesData = require("../data/games.json");

module.exports.getAll = function (req, res) {
  console.log("Controller getAll invoked");
  res.status(200).json(gamesData);
};

module.exports.getOne = function (req, res) {
  console.log("Controller getOne invoked");
  const gameId = req.params.gameId;
  const theGame = gamesData[gameId];
  res.status(200).json(theGame);
};
