import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;

  const newTea = {
    id: nextId++,
    name,
    price,
  };

  teaData.push(newTea);

  return res.status(201).send(newTea);
});

// list all the teas
app.get("/teas", (req, res) => {
  return res.status(200).send(teaData);
});

// get a tea with id


app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
