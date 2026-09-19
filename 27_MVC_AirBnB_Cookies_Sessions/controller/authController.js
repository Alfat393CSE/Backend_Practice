exports.getLogin = (req, res, next) => {
  res.render("../views/auth/login.ejs", {
    pageTitle: "Login Page",
    currentPage: "login",
  });
};

exports.postLogin = (req, res, next) => {
  res.redirect("/");
};
