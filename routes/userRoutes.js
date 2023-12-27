const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "profiles");
  },
  filename: function (req, file, callback) {
    console.log("inside storage", file.originalname);
    callback(null, file.originalname);

  },
});

const upload = multer({ storage: storage });

const {
  signupUser,
  currentUser,
  loginUser,
  loginUser2,
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser)
router.patch("/:id" , upload.single("profile"), updateUser);
router.post("/signup", upload.single("profile"), signupUser);

router.post("/login2", loginUser2);
router.post("/login", loginUser);
// router.post("/login",validateToken, loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
