const Favourites = require("./favourties");
const database = require("../utils/databaseUtils");
const { ObjectId } = require("mongodb");

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

  static fetchAll() {
    const db = database.getDB();
    return db
      .collection("homes")
      .find()
      .toArray()
      .then((homes) => {
        return homes;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByMyId(homeId) {
    const db = database.getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next()
      .then((home) => {
        return home;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteByMyId(homeId) {}
};
