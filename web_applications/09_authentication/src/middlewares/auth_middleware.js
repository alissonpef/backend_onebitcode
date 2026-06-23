const authMiddleware = (req, res, next) => {
  if (req.session.authenticated) {
    next()
  } else {
    res.redirect('/')
  }
}

const ensureUserIsAdmin = (req, res, next) => {
  if (req.session.currentUser && req.session.currentUser.role === 'admin') {
    next()
  } else {
    res.status(403).send('Acesso negado. Esta página é apenas para administradores.')
  }
}

module.exports = {
  authMiddleware,
  ensureUserIsAdmin
}