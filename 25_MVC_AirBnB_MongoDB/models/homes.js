const Favourites = require("./favourties");
const database = require("../utils/databaseUtils");

module.exports = class Home {
  constructor(houseName, price, image, rating) {
    this.houseName = houseName;
    this.image = image;
    this.price = price;
    this.rating = rating;
  }
  save() {
    const db = database.getDB();
    return db
      .collection("homes")
      .insertOne(this)
      .then((res) => {
        console.log(res);
      });
  }

  static fetchAll() {}

  static findByMyId(homeId) {}

  static deleteByMyId(homeId) {}
};
