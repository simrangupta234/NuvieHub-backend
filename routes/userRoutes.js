const express = require("express");
const {
  signupUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;