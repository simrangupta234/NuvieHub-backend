const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Please give the id"],
    },
    title: {
      type: String,
      required: [true, "Please give title"],
    },
    release_year: {
      type: Number,
      required: [true, "Please Add the release year"],
    },
    duration: {
      type: String,
      required: [true, "Give the duration"],
    },
    genre: {
      type: String,
      required: [true, "Give the genre of the movie"],
    },
    overview: {
      type: String,
      required: [true, "Provide an overview for the movie"],
    },
    starring: {
      type: String,
      required: [true, "Provide stars of the movie"],
    },
    poster: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    preview: [
      {
        type: String,
      },
      {
        type: String,
      },
      {
        type: String,
      },
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
