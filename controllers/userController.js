const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc signup a user
//@route POST /api/users/signup
//@access public
const signupUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already signedup!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  // console.log(`User created ${user}`);
  if (user) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res
      .status(201)
      .json({ _id: user.id, email: user.email, accessToken: accessToken });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  // res.json({ message: "signup the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (!user) {
    res.json({ message: "No email found" });
  } else if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else if (user) {
    res.json({ message: "IncorrectPassword" });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc For welcome back
//@route POST /api/users/login2
//@access public
const loginUser2 = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.json({ email: email });
  } else {
    res.json({ message: "no user" });
  }
});

module.exports = { signupUser, loginUser, currentUser, loginUser2 };
