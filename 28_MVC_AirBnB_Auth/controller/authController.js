exports.getLogin = (req, res, next) => {
  res.render("../views/auth/login.ejs", {
    pageTitle: "Login Page",
    currentPage: "login",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("../views/auth/signup.ejs", {
    pageTitle: "SignUp Page",
    currentPage: "signup",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
