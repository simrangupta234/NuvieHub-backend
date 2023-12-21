const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      require: [true, "Please give the id"],
    },
    title: {
      type: String,
      require: [true, "Please give title"],
    },
    release_year: {
      type: Number,
      require: [true, "Please Add the release year"],
    },
    duration: {
      type: String,
      require: [true, "Give the duration"],
    },
    genre: {
      type: String,
      require: [true, "Give the genre of the movie"],
    },
    overview: {
      type: String,
      require: [true, "Provide overview for the movie"],
    },
    starring: {
      type: String,
      require: [true, "Provide stars of the movie"],
    },
    poster: {
      data: Buffer,
      contentType: String,
    },
    thumbnail: {
      data: Buffer,
      contentType: String,
    },
    preview: [
      {
        data: Buffer,
        contentType: String,
      },
      {
        data: Buffer,
        contentType: String,
      },
      {
        data: Buffer,
        contentType: String,
      },
      {
        data: Buffer,
        contentType: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
