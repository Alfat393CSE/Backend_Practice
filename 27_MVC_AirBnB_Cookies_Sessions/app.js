const express = require("express");
const path = require("path");

const rootDir = require("./utils/pathUtils");
const { host } = require("./routes/host");
const { store } = require("./routes/store");
const { authRouter } = require("./routes/authRouter");
const { pageNotFound } = require("./controller/errorController");
const { default: mongoose } = require("mongoose");
const { MONGO_URI } = require("./utils/databaseUtils");

const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  req.isLoggedIn = req.get("Cookie") ? req.get("Cookie").split("=")[1] === "true" : false;
  console.log(req.isLoggedIn);
  next();
});

app.use(host);
app.use("/user", store);
app.use("/user", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});

app.use(authRouter);
app.use(pageNotFound);

const PORT = 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
