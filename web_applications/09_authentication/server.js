const express = require('express')
const session = require('express-session')
const path = require('path')
const router = require('./src/routes')

const app = express()

app.use(session({
  secret: 'seu-segredo-super-secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))