// Imports
const router = require('express').Router()

// Models
const {User} = require('../db/models')

// Middleware
router.use('/meetup', require('./meetup'))

// Routes
router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/signup', async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body

  try {
    const user = await User.create({firstName, lastName, email, password})

    req.login(user, error => (error ? next(error) : res.json(user)))
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(error)
    }
  }
})

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({where: {email}})

    if (!user) {
      console.log('No such user found:', email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, error => (error ? next(error) : res.json(user)))
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// Exports
module.exports = router
