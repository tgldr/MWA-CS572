module.exports.getAll = function (req, res) {
  console.log("GAMES GET received");
  res.status(200).json({ jsonData: "GET" });
};
