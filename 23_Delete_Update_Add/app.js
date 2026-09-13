const express = require("express");
const path = require("path");
const rootDir = require("./utils/pathUtils");

const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
