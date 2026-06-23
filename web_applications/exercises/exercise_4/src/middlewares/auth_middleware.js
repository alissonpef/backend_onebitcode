const jwt = require('jsonwebtoken')
const users = require('../models/users')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  optionalAuth: (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return next()
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return next()
    }

    try {
      const { id } = jwt.verify(token, JWT_SECRET)

      const user = users.findById(id)
      if (!user) return res.status(404).json({ message: 'User not found!' })

      req.authenticatedUser = user
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token!' })
    }
  },

  ensureAuth: (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header required!' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token not found!' })
    }

    try {
      const { id } = jwt.verify(token, JWT_SECRET)

      const user = users.findById(id)
      if (!user) return res.status(404).json({ message: 'User not found!' })

      req.authenticatedUser = user
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token!' })
    }
  },

  ensureAdmin: (req, res, next) => {
    if (req.authenticatedUser && req.authenticatedUser.role === 'admin') {
      next()
    } else {
      res.status(403).json({ message: 'Permission denied!' })
    }
  }
}