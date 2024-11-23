const express = require("express");
const routes = express.Router();
const autentication = require("../middleware/authMiddleware");
const {
  answer,
  onequstion,
  allanswers,
} = require("../controller/answerController");
//route to answers
routes.post("/questions/myanswers/:questionId", answer);
routes.get("/questions/:questionId", onequstion);
routes.get("/answer/:questionId", allanswers);

module.exports = routes;
