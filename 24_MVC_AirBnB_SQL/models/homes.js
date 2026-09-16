const Favourites = require("./favourties");
const db = require("../utils/databaseUtils");

module.exports = class Home {
  constructor(houseName, price, image, rating) {
    this.houseName = houseName;
    this.image = image;
    this.price = price;
    this.rating = rating;
  }
  save() {
    return db.execute(
      `INSERT INTO homes (houseName, image, price, rating) VALUES(?,?,?,?)`,
      [this.houseName, this.image, this.price, this.rating],
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findByMyId(homeId) {}

  static deleteByMyId(homeId) {}
};
