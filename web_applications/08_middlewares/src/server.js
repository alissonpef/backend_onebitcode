const express = require('express')
const path = require('path') 
const { middlewareA, middlewareB } = require('./middlewares/test')
const uploadMiddleware = require('./middlewares/upload')

const app = express()

app.use(express.static('public'))

app.use(middlewareA)

app.get('/testeA', (req, res) => {
  console.log('Dentro da rota /testeA');
  console.log({ a: req.middlewareA, b: req.middlewareB })
  res.send('Teste A concluído. Verifique o console do servidor.')
})

app.get('/testeB', middlewareB, (req, res) => {
  console.log('Dentro da rota /testeB');
  console.log({ a: req.middlewareA, b: req.middlewareB })
  res.send('Teste B concluído. Verifique o console do servidor.')
})

app.post('/upload', uploadMiddleware.single('image'), (req, res) => {
  console.log('Dentro da rota /upload');
  console.log('--- Informações do arquivo (req.file): ---');
  console.log(req.file);
  console.log('--- Informações do corpo (req.body): ---');
  console.log(req.body);
  res.send('Upload realizado com sucesso! Verifique o console e a pasta "uploads".')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`))