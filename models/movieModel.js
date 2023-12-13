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
    year: {
      type: Number,
      require: [true, "Please Add the release year"],
    },
    description: {
      type: String,
      require: [true, "Give Description for the movie"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Movie" , movieSchema)
