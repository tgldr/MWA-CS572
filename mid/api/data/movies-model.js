const mongoose = require("mongoose");

// const AwardSchema = mongoose.Schema({
//   wins: Number,
//   nominations: Number,
//   text: String,
// });
const ImdbSchema = mongoose.Schema({
  rating: Number,
  votes: Number,
});
// const TomatoeSchema = mongoose.Schema({
//   viewer: Object,
// });

const movieSchema = mongoose.Schema({
  title: String,
  //   plot: String,
  //   genres: [String],
  //   runtime: Number,
  //   cast: [String],
  //   num_mflix_comments: Number,
  //   fullplot: String,
  //   countries: [String],
  //   released: Date,
  //   rated: String,
  //   awards: Object,
  //   lastUpdated: Date,
  //   year: Number,
  //   imdb: ImdbSchema,
  //   type: String,
  //   tomatoes: Object,
});

mongoose.model(process.env.MOVIE_MODEL, movieSchema, "movies");
