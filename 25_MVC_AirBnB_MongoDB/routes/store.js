const express = require("express");
const store = express.Router();
const storeController = require("../controller/storeController");

store.get("/add-home", storeController.getForm);
store.post("/output-home", storeController.getFormOutput); 
store.get("/:homeId", storeController.homeDetailes);

exports.store = store;
