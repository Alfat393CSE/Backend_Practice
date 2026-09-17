const { getDB } = require("../utils/databaseUtils");

module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }

  static getFavourites() {
    const db = getDB();
    return db.collection("bookings").find().toArray();
  }

  addToFavourite() {
    const db = getDB();
    return db.collection("bookings").insertOne(this);
  }

  static deleteFavourite(delHomeId) {
    const db = getDB();
    return db.collection("bookings").deleteOne({ homeId: delHomeId });
  }
};
