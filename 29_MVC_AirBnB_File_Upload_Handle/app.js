const express = require("express");
const path = require("path");

const rootDir = require("./utils/pathUtils");
const { host } = require("./routes/host");
const { store } = require("./routes/store");
const { authRouter } = require("./routes/authRouter");
const { pageNotFound } = require("./controller/errorController");
const { default: mongoose } = require("mongoose");
const { MONGO_URI } = require("./utils/databaseUtils");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
    );
  },
});

app.use(express.urlencoded());
app.use(multer({ storage }).single("image"));
app.use(express.static(path.join(rootDir, "public")));

const stores = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "Alfat Tasnim Hasan",
    resave: false,
    saveUninitialized: true,
    store: stores,
  }),
);

app.use(host);
app.use("/user", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});
app.use("/user", store);

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
