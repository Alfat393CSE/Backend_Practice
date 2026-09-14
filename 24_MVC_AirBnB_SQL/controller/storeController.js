const Home = require("../models/homes");

exports.getForm = (req, res, next) => {
  res.render("../views/store/inputForm", {
    pageTitle: "Add Homes",
    currentPage: "inputForm",
    editing: false,
    home: null,
  });
};

exports.getFormOutput = (req, res, next) => {
  const { houseName, price, image, rating } = req.body;
  const home = new Home(houseName, price, image, rating);
  home.save();

  res.render("../views/store/outputForm", {
    pageTitle: "Add Homes",
    currentPage: "outputForm",
  });
};

exports.homeDetailes = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByMyId(homeId, (home) => {
    if (!home) {
      console.log(`home not found`);
      return res.redirect("/");
    } else {
      console.log(home);
      res.render("../views/store/home-detailes.ejs", {
        home: home,
        pageTitle: "Home Detailes",
        currentPage: "home-detailes",
      });
    }
  });
};
