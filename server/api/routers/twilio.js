// Imports
const router = require('express').Router()
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
const {MessagingResponse} = require('twilio').twiml
const {Translate} = require('@google-cloud/translate').v2

// Models
const {User} = require('../../db/models')

// Initializations
const bodyRegex = /[^\w\s,.!?'"]/gi
const toRegex = /-+/g

const sendSms = (body, to) => {
  const payload = {
    body,
    from: process.env.PN_TWILIO,
    to
  }

  console.log({payload})

  client.messages.create(payload).then(message => console.log(message.sid))
}

// Middleware
const sendTextAuth = (req, res, next) => {
  if (req.user.role === 'Doctor') {
    next()
  } else {
    res.status(401).send('Access Denied')
  }
}

// Routes
router.post('/sms', sendTextAuth, async (req, res, next) => {
  let {googleId, text, Body, From, To} = req.body

  console.log({googleId, text, Body, From, To})

  try {
    const twiml = new MessagingResponse()
    const translate = new Translate()

    let patient
    if (googleId) {
      patient = await User.findOne({
        where: {googleId},
        // Explicitly select only the fullName, language, and phone fields -
        // even though users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['fullName', 'language', 'phone']
      })

      // Manually set patient language and phone number for testing purposes
      patient.language = 'es'
      patient.phone = process.env.PN_TEST

      console.log({patient})

      if (patient && patient.fullName && patient.phone) {
        Body = `Hello, ${patient.fullName}. ${text.replace(bodyRegex, '')}`
        To = `+1${patient.phone.replace(toRegex, '')}`
      }
    }

    // Print sender and message
    console.log(`Incoming text message from ${From} to ${To}: ${Body}`)
/*
    // Translate message to patient language
    const [result, _] = await translate.translate(
      Body,
      patient.language || 'en'
    )

    
    console.log({result})

    Body = result
    */

    sendSms(Body, To)
    twiml.message(Body)

    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
