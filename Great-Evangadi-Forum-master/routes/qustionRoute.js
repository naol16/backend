const express = require("express");
const route = express.Router();
const autentication = require("../middleware/authMiddleware");
const {
  askquestion,
  allqustions,
} = require("../controller/askQuestionController");
//route to qustion
route.post("/myquestions", askquestion);
route.get("/questionList", allqustions);
module.exports = route;
