const mongoose = require("mongoose");
const Student = mongoose.model(process.env.DB_STUDENTS_MODEL);

getAll = function (req, res) {
  let query;
  console.log("Controller getAll invoked");
  let count = parseInt(process.env.DEFAULT_FIND_LIMIT);
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
  const maxCount = parseInt(process.env.MAX_FIND_LIMIT);

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

  if (req.query && req.query.name) {
    query = { name: { $regex: new RegExp(req.query.name, "i") } };
  }

  Student.find(query, null, { skip: offset, limit: count }).exec(function (
    err,
    students
  ) {
    if (err) {
      console.log("error");
      res.status(500).json(err);
    } else {
      console.log("Found Students");
      res.status(200).json(students);
    }
  });
};

getOne = function (req, res) {
  const studentId = req.params.studentId;

  if (!mongoose.isValidObjectId(studentId)) {
    console.log("Request param studentID is not a valid ID");
    res
      .status(400)
      .json({ message: "Request param studentID is not a valid ID" });
    return;
  }

  Student.findById(studentId).exec(function (err, student) {
    const response = {
      status: 200,
      message: student,
    };
    if (err) {
      console.log("Error founding student");
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = "StudentID Not found";
    }

    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAll,
  getOne,
};
