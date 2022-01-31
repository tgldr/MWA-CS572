const mongoose = require("mongoose");
const Inspection = mongoose.model(process.env.INSPECTIONS_MODEL);

const getAll = function (req, res) {
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
  let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
  const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(process.env.REST_API_ERROR).json({
      message: "QueryString offset and count should be numbers",
    });
    return;
  }

  if (count > maxCount) {
    res.status(process.env.REST_API_ERROR).json({
      message: "Cannot exceed count of " + maxCount,
    });
    return;
  }

  Inspection.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, inspections) {
      const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: inspections,
      };

      if (err) {
        response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message = err;
      }

      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  const inspectionId = req.params.inspectionId;

  if (!mongoose.isValidObjectId(inspectionId)) {
    res
      .status(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR)
      .json({ message: process.env.REST_API_INVALID_OBJECT_MESSAGE });
    return;
  }

  Inspection.findById(inspectionId).exec(function (err, inspection) {
    const response = {
      status: parseInt(process.env.REST_API_OK, 10),
      message: inspection,
    };

    if (err) {
      response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
      response.message = err;
    } else if (!inspection) {
      response.status = parseInt(
        process.env.REST_API_RESOURCE_NOT_FOUND_ERROR,
        10
      );
      response.message = process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE;
    }

    res.status(response.status).json(response.message);
  });
};

const deleteOne = function (req, res) {
  const inspectionId = req.params.inspectionId;

  if (!mongoose.isValidObjectId(inspectionId)) {
    res
      .status(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR)
      .json({ message: process.env.REST_API_INVALID_OBJECT_MESSAGE });
    return;
  }

  Inspection.findByIdAndDelete(inspectionId).exec(function (err, inspection) {
    const response = {
      status: parseInt(process.env.REST_API_DEL_OK, 10),
      message: inspection,
    };

    if (err) {
      response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
      response.message = err;
    } else if (!inspection) {
      response.status = parseInt(
        process.env.REST_API_RESOURCE_NOT_FOUND_ERROR,
        10
      );
      response.message = process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAll,
  getOne,
  deleteOne,
};
