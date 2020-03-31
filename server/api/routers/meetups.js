// Imports
const router = require('express').Router()
const axios = require('axios')

// Routes
router.get('/:groupId', async (req, res, next) => {
  const {groupId} = req.params

  try {
    const {data} = await axios.get(
      `https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=${groupId}&page=5`
    )

    res.json(data)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
