const jwt = require('jsonwebtoken')
const users = require('../models/users')

const secretKey = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header required' })
  }

  const token = authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Token not found' })
  }

  try {
    const decodedToken = jwt.verify(token, secretKey)
    const user = users.find(u => u.username === decodedToken.username)

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' })
    }

    req.authenticatedUser = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = authMiddleware