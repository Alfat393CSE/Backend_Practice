exports.getLogin = (req, res, next) => {
  res.render("../views/auth/login.ejs", { pageTitle: "Login Page", currentPage: "login" });
};
