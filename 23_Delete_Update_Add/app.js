const express = require("express");
const rootDir = require("./utils/pathUtils");

const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

