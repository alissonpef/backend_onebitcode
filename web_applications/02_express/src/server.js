const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Servidor Express funcionando!\nVocê está na página inicial.");
});
server.get("/artigos", (req, res) => {
  res.send("Você está na página artigos.");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor Express iniciado em http://localhost:${PORT}/`);
});
