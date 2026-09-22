const User = require("../models/user");
const Home = require("../models/homes");

exports.getHomePage = (req, res, next) => {
  console.log(req.session, req.session.isLoggedIn);
  Home.find()
    .then((rows) => {
      res.render("../views/home/home-page.ejs", {
        registerHome: rows,
        pageTitle: "HomePage",
        currentPage: "home",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHomeList = (req, res, next) => {
  Home.find()
    .then((rows) => {
      res.render("../views/store/home-list.ejs", {
        registerHome: rows,
        pageTitle: "Home List",
        currentPage: "home-list",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        return res.redirect("/home-list");
      }
      res.render("../views/store/inputForm.ejs", {
        home: home,
        pageTitle: "Edit Home",
        currentPage: "edit-home",
        editing: editing,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, image, rating } = req.body;

  Home.findById(id)
    .then((home) => {
      if (!home) {
        console.log(`home editing mode unsuccessful`);
        return res.redirect("/home-list");
      }
      home.houseName = houseName;
      home.price = price;
      home.image = image;
      home.rating = rating;
      return home.save();
    })
    .then(() => {
      res.redirect("/home-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.bookings = (req, res, next) => {
  const userId = req.session.user._id;
  User.findById(userId)
    .populate("bookedHomes")
    .then((user) => {
      res.render("../views/store/booking.ejs", {
        bookedHomes: user.bookedHomes,
        pageTitle: "Bookings",
        currentPage: "booking",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    });
};

exports.myBookings = (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user.bookedHomes.includes(homeId)) {
        user.bookedHomes.push(homeId);
        return user.save();
      }
      return user;
    })
    .then(() => {
      res.redirect("/bookings");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/bookings");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/home-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;

  User.findById(userId)
    .then((user) => {
      user.bookedHomes = user.bookedHomes.filter(
        (id) => id.toString() !== homeId,
      );
      return user.save();
    })
    .then(() => {
      res.redirect("/bookings");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/bookings");
    });
};
