const users = require("../models/users")
const bcrypt = require('bcrypt')

module.exports = {
  index: (req, res) => {
    const allUsers = users.findAll().map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }))
    res.json(allUsers)
  },

  show: (req, res) => {
    const { id } = req.params
    const user = users.findById(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  },

  save: async (req, res) => {
    const { name, email, password, role } = req.body

    if (
      typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' ||
      typeof role !== 'string' || !role.match(/^(admin|standard)$/)
    ) {
      return res.status(400).json({ message: 'Invalid fields!' })
    }
    
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = users.createUser(name, email, passwordHash, role)

    if (!newUser) return res.status(400).json({ message: 'Email already in use' })

    res.status(201).json({ 
      id: newUser.id, 
      name: newUser.name, 
      email: newUser.email, 
      role: newUser.role 
    })
  },

  delete: (req, res) => {
    const { id } = req.params
    const user = users.findById(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    
    const deletedUser = users.deleteUser(id)
    
    if (!deletedUser) return res.status(400).json({ message: "Couldn't delete user" })
    
    res.json({ 
      id: deletedUser.id, 
      name: deletedUser.name, 
      email: deletedUser.email, 
      role: deletedUser.role 
    })
  }
}