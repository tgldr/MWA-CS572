multiply = function (req, res) {
  const number = parseFloat(req.params.number) || 0;
  let other = 0;
  if (req.query && req.query.other) {
    other = parseFloat(req.query.other);
  }

  res.status(200).json({ result: number * other });
};

module.exports = {
  multiply,
};
