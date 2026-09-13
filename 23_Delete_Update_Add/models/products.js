const products = [];

module.exports = class Product {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};
