const express = require("express");
const {
  signupUser,
  currentUser,
  loginUser,
  loginUser2,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login2", loginUser2);
router.post("/login", loginUser);
// router.post("/login",validateToken, loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;