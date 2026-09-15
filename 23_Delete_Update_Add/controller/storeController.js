const Cart = require("../models/carts");
const Product = require("../models/products");

exports.addProductForm = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("../views/store/addProductForm.ejs", {
      pageTitle: "Add Product",
      editing: false,
      product: products,
    });
  });
};

exports.postProductList = (req, res, next) => {
  const { name, price, image } = req.body;
  const products = new Product(name, price, image);
  products.save();
  res.redirect("/product-list");
};

exports.postEditProduct = (req, res, next) => {
  const { id, name, price, image } = req.body;
  const products = new Product(name, price, image);
  products.id = id;
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
      return res.redirect("/product-list");
    }
    res.render("../views/store/viewDetailes.ejs", {
      pageTitle: `View Detailes of ${product.name}`,
      product: product,
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const editing = req.query.editing === "true";
  const productId = req.params.id;

  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/product-list");
    }
    res.render("../views/store/addProductForm.ejs", {
      pageTitle: "Edit Product",
      editing: editing,
      productId: productId,
      product: product,
    });
  });
};

exports.getAddToCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartList = cart.map((id) =>
        products.find((product) => product.id === id),
      );
      res.render("../views/store/addToCart.ejs", {
        pageTitle: `Cart List`,
        products: cartList,
      });
    });
  });
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.params.id;
  Cart.addToCart(productId);
  res.redirect("/add-to-cart");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.deleteById(productId, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/product-list");
  });
};

exports.deleteCart = (req, res, next) => {
  const productId = req.params.id;
  Cart.deleteCart(productId, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/add-to-cart");
  });
};
