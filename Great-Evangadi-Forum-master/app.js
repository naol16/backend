require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
app.use(cors());
const dbconnection = require("./db/dbConfig");
//user route middelware file
const userRoute = require("./routes/userRoute");
//json middleware

app.use(express.json());
//authentication-
const authentication = require("./middleware/authMiddleware");
//user route middelware
app.use("/api/users", userRoute);

//question route middelware file
const questionRoute = require("./routes/qustionRoute");
//question route middelware
app.use("/api/questions", authentication, questionRoute);

//answer route middelware file
const answerRoute = require("./routes/answerRoute");
//answer route middelware

app.use("/api", authentication, answerRoute);

async function start() {
  try {
    const result = await dbconnection.query("SELECT 'Database connected' AS message");
    console.log(result.rows[0].message)
    await app.listen(port);
    console.log(`Listing port ${port}`);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
start();


