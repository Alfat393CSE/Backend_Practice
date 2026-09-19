const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);

exports.authRouter = authRouter;
