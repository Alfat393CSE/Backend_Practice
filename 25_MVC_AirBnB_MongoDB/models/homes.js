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
    if (this.id) {
      return db.execute(
        `UPDATE homes SET houseName=?, image=?, price=?, rating=? WHERE id = ?`,
        [this.houseName, this.image, this.price, this.rating, this.id],
      );
    } else {
      return db.execute(
        `INSERT INTO homes (houseName, image, price, rating) VALUES(?,?,?,?)`,
        [this.houseName, this.image, this.price, this.rating],
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findByMyId(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteByMyId(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
