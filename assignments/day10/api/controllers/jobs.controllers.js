const mongoose = require("mongoose");
const Job = mongoose.model(process.env.JOB_MODEL);

_runGeoQuery = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);

  const point = { type: "Point", coordinates: [lng, lat] };

  Job.aggregate(
    [
      {
        $geoNear: {
          near: point,
          spherical: true,
          distanceField: "distance",
          maxDistance: parseFloat(process.env.GEO_SEARCH_MAX_DIST, 10),
          minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10),
        },
      },
    ],
    function (err, jobs) {
      if (err) {
        console.log("Geo error", err);
        res.status(200).json(err);
      } else {
        console.log("Geo Result", jobs);
        res.status(200).json(jobs);
      }
    }
  );
};

_addReview = function (req, res, job) {
  if (!req.body.reviewText || !req.body.nameOfReviewer) {
    res.status(500).json({ message: "Review Text or Name missing" });
  }

  job.reviews.push({
    reviewText: req.body.reviewText,
    nameOfReviewer: req.body.nameOfReviewer,
  });

  job.save(function (err, updatedJob) {
    const response = {
      status: 201,
      message: updatedJob,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

getAll = function (req, res) {
  console.log("getAll");

  if (req.query && req.query.lat && req.query.lng) {
    _runGeoQuery(req, res);
    return;
  }
  var d = new Date();
  d.setMonth(d.getMonth() - 6);

  Job.find({
    postDate: {
      $gte: d,
      $lt: new Date(),
    },
  })
    .select("-salary")
    .exec(function (err, jobs) {
      const response = {
        status: 200,
        message: jobs,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }

      res.status(response.status).json(response.message);
    });
};

addOne = function (req, res) {
  console.log("addOne");

  if (isNaN(req.body.lat) || isNaN(req.body.lng)) {
    console.log("Wrong location");
    res.status(400).json({ message: "Location wrong" });
    return;
  }

  const newJob = {
    title: req.body.title,
    salary: req.body.salary,
    location: {
      coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    },
    description: req.body.description,
    experience: req.body.experience,
    skills: req.body.skills,
    reviews: [],
  };

  Job.create(newJob, function (err, job) {
    const response = {
      status: 201,
      message: job,
    };

    if (err) {
      console.log("Error creating new job", err);
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

const addReview = function (req, res) {
  console.log("Add Review");
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select("reviews")
    .exec(function (err, job) {
      const response = {
        status: 201,
        message: job,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        response.status = 404;
        response.message = "JobId not found:" + jobId;
      }
      if (job) {
        _addReview(req, res, job);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

module.exports = {
  getAll,
  addOne,
  addReview,
};
