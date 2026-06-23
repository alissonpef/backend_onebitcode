const bcrypt = require('bcrypt')
const users = require('../models/users')

module.exports = {
  index: (req, res) => {
    if (req.session.authenticated) {
      return res.redirect('/dashboard')
    }
    res.render('index')
  },

  register: async (req, res) => {
    const { username, password, role } = req.body
    if (!username || !password || !role) {
      return res.status(400).send('Todos os campos são obrigatórios.')
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    users.push({ username, passwordHash, role })
    res.redirect('/')
  },

  login: async (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username)

    if (user && await bcrypt.compare(password, user.passwordHash)) {
      req.session.authenticated = true
      req.session.currentUser = { username: user.username, role: user.role }
      res.redirect('/dashboard')
    } else {
      res.status(401).send('Usuário ou senha inválidos.')
    }
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/dashboard')
      }
      res.clearCookie('connect.sid')
      res.redirect('/')
    })
  }
}