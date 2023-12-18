const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const { importData } = require("./controllers/movieController");

connectDb();
importData();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);


app.use('/assets', express.static('assets'))


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

