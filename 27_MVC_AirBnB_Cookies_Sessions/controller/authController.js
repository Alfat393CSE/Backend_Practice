exports.getLogin = (req, res, next) => {
  res.render("../views/auth/login.ejs", {
    pageTitle: "Login Page",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogOut = (req, res, next) => {
  res.cookie("isLoggedIn", false);
  res.redirect("/login");
};
