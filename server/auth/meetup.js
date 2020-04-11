// Imports
const router = require('express').Router()
const passport = require('passport')
const MeetupStrategy = require('passport-meetup-oauth2').Strategy

// Models
const {User} = require('../db/models')

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.MEETUP_CLIENT_ID = 'your Meetup client id'
 * process.env.MEETUP_CLIENT_SECRET = 'your Meetup client secret'
 * process.env.MEETUP_CALLBACK = '/your/meetup/callback'
 **/

if (!process.env.MEETUP_CLIENT_ID || !process.env.MEETUP_CLIENT_SECRET) {
  console.log('Meetup client ID / secret not found. Skipping Meetup OAuth.')
} else {
  const meetupConfig = {
    clientID: process.env.MEETUP_CLIENT_ID,
    clientSecret: process.env.MEETUP_CLIENT_SECRET,
    callbackURL: process.env.MEETUP_CALLBACK
  }

  const strategy = new MeetupStrategy(
    meetupConfig,
    (token, refreshToken, profile, done) => {
      const meetupId = profile.id
      const email = profile.email

      User.findOrCreate({
        where: {meetupId},
        defaults: {email}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('meetup', {scope: ['basic', 'ageless']})
  )

  router.get(
    '/callback',
    passport.authenticate('meetup', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  )
}

// Exports
module.exports = router
