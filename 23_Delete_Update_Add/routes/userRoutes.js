const express = require("express");
const userRoutes = express.Router();
const userControllers = require("../controller/userController");

userRoutes.get("/", userControllers.getHomePage);

exports.userRoutes = userRoutes;
