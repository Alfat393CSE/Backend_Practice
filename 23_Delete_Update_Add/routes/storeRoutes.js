const express = require("express");
const storeRoutes = express.Router();
const storeControllers = require("../controller/storeController")

storeRoutes.get("/", storeControllers.getForm);
storeRoutes.post("/", storeControllers.postForm);

exports.storeRoutes = storeRoutes;
