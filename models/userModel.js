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
      default: "/profiles/profilePicture.png"
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
      type: Number,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      // required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      // required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
