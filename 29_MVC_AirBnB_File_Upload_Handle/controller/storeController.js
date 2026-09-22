const Home = require("../models/homes");

exports.getForm = (req, res, next) => {
  res.render("../views/store/inputForm", {
    pageTitle: "Add Homes",
    currentPage: "inputForm",
    editing: false,
    home: null,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFormOutput = (req, res, next) => {
  const { houseName, price, image, rating } = req.body;
  console.log(req.body);
  
  const home = new Home({ houseName, price, image, rating });
  home
    .save()
    .then(() => {
      res.render("../views/store/outputForm", {
        pageTitle: "Add Homes",
        currentPage: "outputForm",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.homeDetailes = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log(`home not found`);
        return res.redirect("/");
      } else {
        console.log(home);
        res.render("../views/store/home-detailes.ejs", {
          home: home,
          pageTitle: "Home Detailes",
          currentPage: "home-detailes",
          isLoggedIn: req.session.isLoggedIn,
          user: req.session.user,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
