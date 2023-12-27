const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePic:{
      type: String,
      default: "/profiles/profilePicture.jpg"
    },
    name: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender:{
      type: String,
    },
    no: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
