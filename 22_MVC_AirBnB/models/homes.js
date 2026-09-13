const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const filePath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, image, rating) {
    this.houseName = houseName;
    this.image = image;
    this.price = price;
    this.rating = rating;
  }
  save() {
    Home.fetchAll((registerHome) => {
      if (this.id) {
        registerHome = registerHome.map((home) => {
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        this.id = Math.random().toString();
        registerHome.push(this);
      }

      fs.writeFile(filePath, JSON.stringify(registerHome), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }

  static findByMyId(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => {
        return home.id === homeId;
      });
      callback(homeFound);
    });
  }

  static deleteByMyId(homeId, callback) {
    this.fetchAll((homes) => {
      const updatedHomes = homes.filter((home) => home.id !== homeId);
      fs.writeFile(filePath, JSON.stringify(updatedHomes), callback);
    });
  }
};
