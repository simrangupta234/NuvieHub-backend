const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "profiles");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  signupUser,
  currentUser,
  loginUser,
  loginUser2,
  signedupUser,
  addUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.get("/", signedupUser);
router.post("/" , upload.single("profile"), addUser);
router.post("/signup", signupUser);

router.post("/login2", loginUser2);
router.post("/login", loginUser);
// router.post("/login",validateToken, loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
