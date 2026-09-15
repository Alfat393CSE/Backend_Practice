const express = require("express");
const storeRoutes = express.Router();
const storeControllers = require("../controller/storeController")

storeRoutes.get("/add-product", storeControllers.addProductForm);
storeRoutes.post("/add-product", storeControllers.postProductList);

storeRoutes.get("/product-list", storeControllers.getProductList);
storeRoutes.get("/view-detailes/:id", storeControllers.getDetailes);

exports.storeRoutes = storeRoutes;
