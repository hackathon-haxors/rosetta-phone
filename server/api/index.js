// Imports
const router = require('express').Router()

// Middleware
router.use('/users', require('./routers/users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// Exports
module.exports = router
