const express = require("express");
const path = require("node:path");
const { title } = require("node:process");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const tittle = "Homepage"
  const message = "Mensagem dinâmica inserida pelo EJS"

  res.render("index", {title, message});
});

const PORT = 3000;
app.listen(PORT, () => console.log("Servidor iniciado!"));
