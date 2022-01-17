const mongoose = require("mongoose");

const solveSchema = mongoose.Schema({
  scramble: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  solveStatus: {
    type: String,
    default: "solved",
  },
});

const rubikSessionsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  solves: [solveSchema],
  postedOn: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model(
  process.env.DB_RUBIKSESSIONS_MODEL,
  rubikSessionsSchema,
  "rubikSessions"
);
