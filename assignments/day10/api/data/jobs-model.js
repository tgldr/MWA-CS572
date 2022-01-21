const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
  },
  nameOfReviewer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const pointSchema = mongoose.Schema({
  coordinates: {
    type: [Number],
    index: "2dsphere",
    required: true,
  },
});

const jobSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  salary: Number,
  location: {
    type: pointSchema,
    required: true,
  },
  description: String,
  experience: String,
  skills: [String],
  reviews: [reviewSchema],
  postDate: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model(process.env.JOB_MODEL, jobSchema, "jobs");
