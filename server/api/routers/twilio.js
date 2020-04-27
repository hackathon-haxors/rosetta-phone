// Imports
const router = require('express').Router()
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

// Routes
router.post('/sms', async (req, res, next) => {
  const {message} = req.body
  console.log({message})

  try {
    const twiml = new MessagingResponse()
    const translate = new Translate()

    // // Print sender and message
    // console.log(`Incoming text message from ${req.body.from} to ${req.body.to}: ${req.body.message}`)

    // // Translate message to target language
    // const target = 'es'
    // const [result, _] = await translate.translate(message, target)
    // console.log({result})

    // Temporary result variable for testing purposes
    const result = message
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
