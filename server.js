const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const multer = require("multer");
const Movie = require("./models/movieModel");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "assets");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

connectDb();
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);


app.post("/api/movies", upload.array("testImage", 6), async (req, res) => {
  const { id, title, release_year, duration, genre, overview, starring } =
    req.body;

  var files = req.files;
  const filePath = files.map((file) => file.path);
  const saveImg = new Movie({
    id,
    title,
    release_year,
    duration,
    genre,
    overview,
    starring,
    poster: filePath[0],
    thumbnail: filePath[1],
    preview: [filePath[2], filePath[3], filePath[4], filePath[5]],
  });

    const normalizedPath1 = path.join("/", path.normalize(filePath[0]));
    saveImg.poster = normalizedPath1.replace(/\\/g, "/");
    const normalizedPath2 = path.join("/", path.normalize(filePath[1]));
    saveImg.thumbnail = normalizedPath2.replace(/\\/g, "/");

    for (var i = 2; i < 6; i++) {
      const normalizedPath = path.join("/", path.normalize(filePath[i - 2]));
      saveImg.preview[i - 2] = normalizedPath.replace(/\\/g, "/");
    }
    

  try {
  
    const result = await saveImg.save();
    console.log("Images are saved");
    res.status(201).json(result);
  } catch (err) {
    console.error(err, "Error occurred");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/assets", express.static("assets"));
app.use("/profiles", express.static("profiles"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
