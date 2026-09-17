const Favourites = require("../models/favourties");
const Home = require("../models/homes");

exports.getHomePage = (req, res, next) => {
  Home.fetchAll()
    .then((rows) => {
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
    .then((rows) => {
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
    .then((home) => {
      if (!home) {
        return res.redirect("/home-list");
      }
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
  Favourites.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.homeId);
    Home.fetchAll()
      .then((rows) => {
        const bookedHomes = rows.filter((home) => {
          return favourites.includes(home._id.toString());
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
  const homeId = req.body.id;
  console.log(homeId);

  const booked = new Favourites(homeId);
  booked
    .addToFavourite()
    .then(() => {
      res.redirect("/bookings");
    })
    .catch((err) => {
      console.log(err);
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
  Favourites.deleteFavourite(homeId)
    .then(() => {
      res.redirect("/bookings");
    })
    .catch((err) => {
      console.log(err);
    });
};
