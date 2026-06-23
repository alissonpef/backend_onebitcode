require('dotenv').config()
const express = require('express')
const authRouter = require('./src/routes/auth')
const protectedRouter = require('./src/routes/protected')

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/protected', protectedRouter)

app.listen(3000, () => console.log('Servidor iniciado na porta 3000!'))