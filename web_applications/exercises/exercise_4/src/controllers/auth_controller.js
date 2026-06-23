const users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid fields!' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const registeredUser = users.registerUser(name, email, passwordHash)

    if (!registeredUser) {
      return res.status(400).json({ message: 'Email already in use!' })
    }

    res.status(201).json({ 
      id: registeredUser.id, 
      name: registeredUser.name, 
      email: registeredUser.email, 
      role: registeredUser.role 
    })
  },

  login: async (req, res) => {
    const { email, password } = req.body

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid fields!' })
    }

    const user = users.findByEmail(email)

    if (!user) return res.status(404).json({ message: 'User not found!' })

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const payload = { id: user.id, email: user.email, role: user.role }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })

    res.json({ token })
  }
}