const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const Movie = require("./models/movieModel");

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
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

app.post("/api/movies", upload.array("testImage", 6), async (req, res) => {
  const { id, title, release_year, duration, genre, overview, starring } =
    req.body;

  const saveImg = new Movie({
    id,
    title,
    release_year,
    duration,
    genre,
    overview,
    starring,
    poster: {
      data: fs.readFileSync(req.files[0].path),
    },
    thumbnail: {
      data: fs.readFileSync(req.files[1].path),
    },
    preview: [
      {
        data: fs.readFileSync(req.files[2].path),
      },
      {
        data: fs.readFileSync(req.files[3].path),
      },
      {
        data: fs.readFileSync(req.files[4].path),
      },
      {
        data: fs.readFileSync(req.files[5].path),
      },
    ],
  });

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
