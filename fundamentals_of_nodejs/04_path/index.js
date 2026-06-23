const path = require("node:path")

const dir = "src"
const file = "app.js"

const fullPath = path.join(__dirname, dir, file) // __dirname pega o caminho absoluto do diretório atual e join combina com os outros segmentos
console.log(fullPath)

const relativePath = path.join(".", dir, file) // "." Representa o diretório atual
console.log(relativePath)

const absolutePath = path.resolve(__dirname, relativePath) // Resolve converte o caminho relativo em absoluto
console.log(absolutePath) 

const fileName = path.basename(relativePath) // basename extrai o nome do arquivo do caminho
console.log(fileName)

const ext = path.extname(absolutePath) // extname extrai a extensão do arquivo do caminho absoluto
console.log(ext)