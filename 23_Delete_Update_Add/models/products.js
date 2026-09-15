const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const Cart = require("./carts");

const filePath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }

  save() {
    Product.fetchAll((products) => {
      if (this.id) {
        products = products.map((product) => {
          if (product.id === this.id) {
            return this;
          } else {
            return product;
          }
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static findById(id, callback) {
    this.fetchAll((products) => {
      const product = products.find((product) => product.id === id);
      callback(product);
    });
  }

  static deleteById(id, callback) {
    this.fetchAll((products) => {
      const updateProducts = products.filter((product) => product.id !== id);
      fs.writeFile(filePath, JSON.stringify(updateProducts), (err) => {
        Cart.deleteCart(id, callback);
      });
    });
  }
};
