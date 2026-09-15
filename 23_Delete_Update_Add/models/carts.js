const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");

const filePath = path.join(rootDir, "data", "carts.json");

module.exports = class Cart {
  static addToCart(id) {
    Cart.getCart((cart) => {
      if (cart.includes(id)) {
        console.log("Product is already in cart");
      } else {
        cart.push(id);
        fs.writeFile(filePath, JSON.stringify(cart), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getCart(callback) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
};
