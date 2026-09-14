const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const filePath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourites {
  static getFavourites(callback) {
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }

  static addToFavourite(homeId, callback) {
    this.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already added");
      } else {
        favourites.push(homeId);
        fs.writeFile(filePath, JSON.stringify(favourites), callback);
      }
    });
  }

  static deleteFavourite(homeId, callback) {
    this.getFavourites((favourites) => {
      const favouritesHomes = favourites.filter((id) => id !== homeId);
      fs.writeFile(filePath, JSON.stringify(favouritesHomes), callback);
    });
  }
};
