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

// app.get("/api/movies", (req, res) => res.send("All Good"));

app.post("/api/movies", upload.array("testImage", 6), (req, res) => {
  const { id, title, release_year, duration, genre, overview, starring } =
    req.body;
  const img1Data = req.files[0].buffer;
  const img2Data = req.files[1].buffer;
  const img3Data = req.files[2].buffer;
  const img4Data = req.files[3].buffer;
  const img5Data = req.files[4].buffer;
  const img6Data = req.files[5].buffer;

  const saveImg = new Movie({
    id,
    title,
    release_year,
    duration,
    genre,
    overview,
    starring,
    poster: {
      data: img1Data,
      contentType: req.files[0].mimetype,
    },
    thumbnail: {
      data: img2Data,
      contentType: req.files[1].mimetype,
    },
    preview: [
      {
        data: img3Data,
        contentType: req.files[2].mimetype,
      },
      {
        data: img4Data,
        contentType: req.files[3].mimetype,
      },
      {
        data: img5Data,
        contentType: req.files[4].mimetype,
      },
      {
        data: img6Data,
        contentType: req.files[5].mimetype,
      },
    ],
  });

  saveImg
    .save()
    .then((result) => {
      console.log("Images are saved");
      res.status(201).json(saveImg);

    })
    .catch((err) => {
      console.error(err, "Error occurred");
      res.status(500).json({ error: "Internal Server Error" });

    });
});

connectDb();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get('/', (req, res) => {
//   res.send({message : "Hello World!"})
// })

// app.get('/users', (req, res) => {
//     res.send({message : "Get all users"})
//   })

//   app.get('/users/:id', (req, res) => {
//     res.send({message : `Get user with ID ${req.params.id}`})
//   })

//   app.post('/users', (req, res) => {
//     res.send({message : `Create new user`})
//   })

//   app.put('/users/:id', (req, res) => {
//     res.send({message : `Update user with ID ${req.params.id}`})
//   })

//   app.delete('/users/:id', (req, res) => {
//     res.send({message : `Delete user with ID ${req.params.id}`})
//   })

//   //Application level middleware
// const middlewares = (req, res, next) => {
//     console.log(`${new Date} --- Request [${req.method}] [${req.url}]`);
//     next()
// }

// app.use(middlewares)
