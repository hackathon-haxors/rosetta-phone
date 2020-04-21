// Imports
const router = require('express').Router()

// Middleware
router.use('/google', require('./google'))

// Routes
router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// Exports
module.exports = router
