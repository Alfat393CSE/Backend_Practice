const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");

const filePath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }

  save() {
    Product.fetchAll((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    const fileContent = fs.readFile(filePath, (err, data) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
};
