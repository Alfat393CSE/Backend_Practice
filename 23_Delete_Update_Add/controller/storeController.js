const Product = require("../models/products");

exports.addProductForm = (req, res, next) => {
  res.render("../views/store/addProductForm.ejs", { pageTitle: "Add Product" });
};

exports.postProductList = (req, res, next) => {
  const { name, price, image } = req.body;
  const products = new Product(name, price, image);
  products.save();
  res.redirect("/product-list");
};

exports.getProductList = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("../views/store/productList.ejs", {
      pageTitle: "Product List",
      products: products,
    });
  });
};
