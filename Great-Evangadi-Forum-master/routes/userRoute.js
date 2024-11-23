const express = require("express");
const routes = express.Router();
const autentication = require("../middleware/authMiddleware");
const { register, login, check } = require("../controller/userController");
//register route
routes.post("/register", register);
//login route
routes.post("/login", login);
//check route
routes.get("/check", autentication, check);

module.exports = routes;
