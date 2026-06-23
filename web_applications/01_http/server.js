const http = require("node:http");

const server = http.createServer((request, response) => {
  const path = request.url;

  switch (path) {
    case "/":
      response.writeHead(200);
      response.write("Você está na página Inicial!");
      break;
    case "/artigos":
      response.writeHead(200);
      response.write("Você está na página de Artigos!");
      break;
    default:
      response.writeHead(404);
      response.write("Caminho não encontrado!");
  }

  response.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
