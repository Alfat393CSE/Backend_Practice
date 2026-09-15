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

exports.getDetailes = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("../views/store/viewDetailes.ejs", {
      pageTitle: `View Detailes of ${product.name}`,
      product: product,
    });
  });
};
