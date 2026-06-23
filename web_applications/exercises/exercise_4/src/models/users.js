const users = [
  { 
    id: '1', 
    name: 'Isaac Admin', 
    email: 'isaac@email.com', 
    passwordHash: '$2b$10$y.Xb1BfQ9N8x7C6v5U4t3S2R1Q0P9O8N7M6L5K4J3I2H1G0F9E8D7C6B5A4',
    role: 'admin' 
  }
]

module.exports = {
  findAll: () => users,

  findById: (id) => users.find(user => user.id === id),

  findByEmail: (email) => users.find(user => user.email === email),

  registerUser: (name, email, passwordHash) => {
    const userAlreadyRegistered = users.find(user => user.email === email)

    if (userAlreadyRegistered) return null

    const newUser = {
      id: Math.floor(Math.random() * 9999999).toString(),
      name,
      email,
      passwordHash,
      role: 'standard'
    }

    users.push(newUser)
    return newUser
  },

  createUser: (name, email, passwordHash, role) => {
    const userAlreadyRegistered = users.find(user => user.email === email)

    if (userAlreadyRegistered) return null

    const newUser = {
      id: Math.floor(Math.random() * 9999999).toString(),
      name,
      email,
      passwordHash,
      role
    }

    users.push(newUser)
    return newUser
  },

  deleteUser: (id) => {
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) return null

    const [deletedUser] = users.splice(userIndex, 1)

    return deletedUser
  }
}