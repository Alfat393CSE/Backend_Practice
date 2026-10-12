import express from "express";

const app = express();

// basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// basic configuration

app.use("/", (req, res) => {
  res.send("testing app...");
});

export default app;
