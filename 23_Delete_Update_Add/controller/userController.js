exports.getHomePage = (req, res, next) => {
  res.render("../views/user/home-page.ejs", {
    pageTitle: "HomePage",
  });
};
