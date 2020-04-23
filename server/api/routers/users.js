// Imports
const router = require('express').Router()

// Models
const {User} = require('../../db/models')

// Routes
router.get('/:googleId', async (req, res, next) => {
  const {googleId} = req.params

  try {
    const user = await User.findOne({
      where: {googleId},
      // Explicitly select only the id, googleId, email, firstName, lastName,
      // fullName, and imgUrl fields - even though users' passwords are
      // encrypted, it won't help if we just send everything to anyone who asks!
      attributes: [
        'id',
        'googleId',
        'email',
        'firstName',
        'lastName',
        'fullName',
        'imgUrl'
      ]
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
