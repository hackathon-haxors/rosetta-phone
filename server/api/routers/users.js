// Imports
const router = require('express').Router()

// Models
const {User} = require('../../db/models')

// Middleware
const readUserAuth = (req, res, next) => {
  if (
    (req.user.googleId === req.params.googleId && !req.user.completedSignup) ||
    req.user.role === 'Doctor'
  ) {
    next()
  } else {
    res.status(401).send('Access Denied')
  }
}

const updateUserAuth = (req, res, next) => {
  if (req.user.googleId === req.params.googleId) {
    next()
  } else {
    res.status(401).send('Access Denied')
  }
}

// Routes
router.get('/:googleId', readUserAuth, async (req, res, next) => {
  const {googleId} = req.params

  try {
    const user = await User.findOne({
      where: {googleId},
      // Explicitly select only the id, googleId, email, firstName, lastName,
      // fullName, imgUrl, role, language, phone, and completedSignup fields -
      // even though users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'googleId',
        'email',
        'firstName',
        'lastName',
        'fullName',
        'imgUrl',
        'role',
        'language',
        'phone',
        'completedSignup'
      ]
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:googleId', updateUserAuth, async (req, res, next) => {
  const {googleId} = req.params
  const {role, language, phone} = req.body

  try {
    const [_, updatedUser] = await User.update(
      {
        role,
        language,
        phone,
        completedSignup: true
      },
      {
        where: {googleId},
        returning: true,
        plain: true
      }
    )

    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
