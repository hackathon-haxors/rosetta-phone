// Imports
const express = require('express')
const router = express.Router()
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
const {MessagingResponse} = require('twilio').twiml
const {Translate} = require('@google-cloud/translate').v2

// Initializations
const sendSms = body => {
  const payload = {
    body,
    from: process.env.PN_TWILIO,
    to: process.env.PN_TEST
  }
  console.log({payload})

  client.messages.create(payload).then(message => console.log(message.sid))
}

// Middleware
router.use(express.urlencoded({extended: false}))

// Routes
router.post('/sms', async (req, res, next) => {
  const {Body, From, To} = req.body

  try {
    const twiml = new MessagingResponse()
    const translate = new Translate()

    // Print sender and message
    console.log(`Incoming text message from ${From} to ${To}: ${Body}`)

    // // Translate message to target language
    // const target = 'es'
    // const [result, _] = await translate.translate(Body, target)
    // console.log({result})

    // Temporary result variable for testing purposes
    const result = Body
    console.log({result})

    sendSms(result)
    twiml.message(result)

    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(String(twiml))
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
