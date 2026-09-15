const express = require("express");
const storeRoutes = express.Router();
const storeControllers = require("../controller/storeController")

storeRoutes.get("/add-product", storeControllers.addProductForm);
storeRoutes.post("/add-product", storeControllers.postProductList);

storeRoutes.get("/product-list", storeControllers.getProductList);
storeRoutes.get("/view-detailes/:id", storeControllers.getDetailes);

storeRoutes.get("/add-to-cart", storeControllers.getAddToCart);
storeRoutes.post("/add-to-cart/:id", storeControllers.postAddToCart);

storeRoutes.get("/edit-product/:id", storeControllers.getEditProduct);
storeRoutes.post("/edit-product", storeControllers.postEditProduct);

storeRoutes.post("/delete-product/:id", storeControllers.postDeleteProduct);
storeRoutes.post("/cart/delete-product/:id", storeControllers.deleteCart);

exports.storeRoutes = storeRoutes;
