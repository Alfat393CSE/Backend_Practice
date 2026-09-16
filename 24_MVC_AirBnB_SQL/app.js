const express = require("express");
const path = require("path");

const rootDir = require("./utils/pathUtils");
const { host } = require("./routes/host");
const { store } = require("./routes/store");
const { pageNotFound } = require("./controller/errorController");

const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(host);
app.use("/user", store);
app.use(pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
