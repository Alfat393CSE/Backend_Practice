exports.pageNotFound = (req, res, next) => {
  res.render("../views/404.ejs", { pageTitle: "Page not found" });
};
