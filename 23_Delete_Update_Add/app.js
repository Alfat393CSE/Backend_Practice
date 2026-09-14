const express = require("express");
const path = require("path");
const rootDir = require("./utils/pathUtils");

const { userRoutes } = require("./routes/userRoutes");
const { storeRoutes } = require("./routes/storeRoutes");
const { pageNotFound } = require("./controller/errorController");

const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(userRoutes);
app.use(storeRoutes);
app.use(pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
