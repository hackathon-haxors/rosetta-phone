// Imports
const router = require('express').Router()

// Models
const {User} = require('../db/models')

// Routes
router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params

  try {
    const user = await User.findByPk(userId, {
      // Explicitly select only the id, googleId, firstName, lastName,
      // and email fields - even though users' passwords are encrypted,
      // it won't help if we just send everything to anyone who asks!
      attributes: ['id', 'googleId', 'firstName', 'lastName', 'email']
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
