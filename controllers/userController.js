const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const path = require("path");

//@desc signup a user
//@route POST /api/users/signup
//@access public
const signupUser = asyncHandler(async (req, res) => {
  const { email, password, role, name, dob, gender, no, address } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  let profilePicPath = "/profiles/profilePicture.jpg";

  if (req.file) {
    profilePicPath = req.file.path.replace(/\\/g, "/");
  }


  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    role,
    name,
    dob,
    gender,
    no,
    address,
    profilePic: profilePicPath,
  });

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
    res.status(201).json({ user, accessToken: accessToken });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role, name, dob, gender, no, address } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ message: "Email not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken, user });
  } else {
    res.json({ message: "incorrect password" });
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
  const { email, password, role, name, dob, gender, no, address } = req.body;
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.json({ email: email });
  } else {
    res.json({ message: "no user" });
  }
});

//@desc list of user
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// //@desc add user
// //@route PATCH /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, dob, gender, no, address } = req.body;
  const userToUpdate = await User.findOne({ email });

  if (!userToUpdate) {
    res.status(404);
    throw new Error("User not found");
  }

  userToUpdate.name = name;
  userToUpdate.dob = dob;
  userToUpdate.gender = gender;
  userToUpdate.no = no;
  userToUpdate.address = address;

  if (req.file) {
    const normalizedPath = path.join("/", path.normalize(req.file.path));
    userToUpdate.profilePic = normalizedPath.replace(/\\/g, "/");
  }

  const updatedUser = await userToUpdate.save();

  res.json(updatedUser);
});

//@desc get User by Id
//@route GET /api/users/id
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

module.exports = {
  signupUser,
  loginUser,
  currentUser,
  loginUser2,
  getUsers,
  updateUser,
  getUser,
};
