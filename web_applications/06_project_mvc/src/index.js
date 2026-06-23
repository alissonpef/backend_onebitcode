const express = require("express")
const path = require("node:path")
const router = require("./routes"); 

const app = express()

// Configuração do EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Configuração de Arquivos estáicos
app.use(express.static("public"))

// Configuração para ler Dados da requsição
app.use(express.urlencoded({ extended: true }))

// Rotas da Aplicação
app.use(router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor inciado! \nRodando em: http://localhost:${PORT}`))

