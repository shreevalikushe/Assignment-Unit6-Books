const express = require("express");
const app = express();
const books = require("./books.json");
app.use(express.json());

const nameMiddleware = (req, res, next) => {
  const name = { name: "Shreevali Kushe" };
  req.name = name;
  next();
};
app.use(nameMiddleware);
app.get("/", (req, res) => {
  console.log(req.name);
  res.json({ name: req.name, books });
});
app.post("/books", (req, res) => {
  const bookUpdate = [...books, req.body];
  res.json({ name: req.name, bookUpdate });
});

app.get("/books/:id", (req, res) => {
  const singleBook = books.filter((item) => item.id === Number(req.params.id));
  res.json({ name: req.name, singleBook });
});
app.patch("/books/:id", (req, res) => {
  const updatedBooks = books.map((item) =>
    item.id === Number(req.params.id)
      ? {
          ...item,
          author: req.body.author,
          publish_year: req.body.publish_year,
        }
      : item
  );
  res.json({ name: req.name, updatedBooks });
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const updatedBooks = books.filter((item) => Number(item.id) !== Number(id));
  res.json({ name: req.name, updatedBooks });
});

app.listen(3210, (req, res) => {
  console.log("Listening on port 3210");
});
