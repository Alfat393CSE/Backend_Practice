const Favourites = require("../models/favourties");
const Home = require("../models/homes");

exports.getHomePage = (req, res, next) => {
  Home.fetchAll()
    .then(([rows, fields]) => {
      res.render("../views/home/home-page.ejs", {
        registerHome: rows,
        pageTitle: "HomePage",
        currentPage: "home",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHomeList = (req, res, next) => {
  Home.fetchAll()
    .then(([rows, fields]) => {
      res.render("../views/store/home-list.ejs", {
        registerHome: rows,
        pageTitle: "Home List",
        currentPage: "home-list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findByMyId(homeId)
    .then(([rows]) => {
      const home = rows[0];
      if (!home) {
        return res.redirect("/home-list");
      }
      console.log(editing, homeId);
      res.render("../views/store/inputForm.ejs", {
        home: home,
        pageTitle: "Edit Home",
        currentPage: "edit-home",
        editing: editing,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, image, rating } = req.body;
  const home = new Home(houseName, price, image, rating);
  home.id = id;
  home
    .save()
    .then(() => {
      res.render("../views/store/outputForm", {
        pageTitle: "Add Homes",
        currentPage: "outputForm",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.bookings = (req, res, next) => {
  Favourites.getFavourites((favourites) => {
    Home.fetchAll()
      .then(([rows, fields]) => {
        const bookedHomes = rows.filter((home) => {
          return favourites.includes(home.id);
        });
        res.render("../views/store/booking.ejs", {
          bookedHomes: bookedHomes,
          pageTitle: "Bookings",
          currentPage: "booking",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.myBookings = (req, res, next) => {
  Favourites.addToFavourite(req.body.id, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/bookings");
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteByMyId(homeId)
    .then(() => {
      res.redirect("/home-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourites.deleteFavourite(homeId, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/bookings");
  });
};
