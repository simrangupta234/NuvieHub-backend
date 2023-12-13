const express = require("express");
// const fetch = require("node-fetch");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

connectDb();
app.use(express.json());
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));



// const moviesData = async () => {
//   const data = fetch(
//     "https://api.themoviedb.org/3/trending/all/day?api_key=8f003ce108004712f54fccae5f9d1692"
//   );

//   const res = await data.json();
// console.log(res);
// };

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
