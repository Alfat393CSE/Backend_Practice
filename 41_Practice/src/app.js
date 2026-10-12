import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.send("testing app...");
});

export default app;
