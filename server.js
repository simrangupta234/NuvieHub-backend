const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./config/dbConnection");
connectDb();
app.use(express.json());
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
var cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methodes", "POST, GET, PUT, DELETE");
  res.header(
    "access-Control-Allow-Headers",
    "Content-type, X-Auth-Token, Origin, Autherization"
  );
  next();
});

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methodes: POST, GET, PUT, DELETE");
// header(
//   "access-Control-Allow-Headers: Content-type, X-Auth-Token, Origin, Autherization"
// );

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
