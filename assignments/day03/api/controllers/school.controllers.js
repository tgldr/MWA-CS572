const schoolData = require("../data/school.json");

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
  const pagedStudents = schoolData.slice(
    offset,
    parseInt(offset) + parseInt(count)
  );
  res.status(200).json(pagedStudents);
};

getOne = function (req, res) {
  console.log("Controller getOne invoked");
  const studentId = req.params.studentId;
  const theGame = schoolData[studentId];
  res.status(200).json(theGame);
};

module.exports = {
  getAll,
  getOne,
};
