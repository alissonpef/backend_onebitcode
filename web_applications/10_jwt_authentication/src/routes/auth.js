const express = require('express')
const users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authRouter = express.Router()
const secretKey = process.env.JWT_SECRET

authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = { username, passwordHash }
  users.push(user)

  res.status(201).json({ username: user.username })
})

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username)

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const payload = { username: user.username }
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

  res.json({ token })
})

module.exports = authRouter