// Imports
const router = require('express').Router()
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
const {MessagingResponse} = require('twilio').twiml
const {Translate} = require('@google-cloud/translate').v2

// console.log({client, MessagingResponse, Translate})

// Initializations
const sendSms = body => {
  const payload = {
    body,
    from: process.env.PN_TWIL,
    to: process.env.PN_TEST
  }
  console.log({payload})

  client.messages.create(payload).then(message => console.log(message.sid))
}

// sendSms('TESTING')
// console.log('Awaiting test message')

// Routes
router.post('/sms', async (req, res, next) => {
  const {message} = req.body
  console.log({message})

  try {
    const twiml = new MessagingResponse()
    const translate = new Translate()

    // // Print sender and message
    // console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`)

    // // Extract message from request body
    // const {Body} = req.body
    // console.log({Body})

    // // Translate message to target language
    // const target = 'es'
    // const [result, _] = await translate.translate(message, target)
    // console.log({result})

    // Temporary result variable for testing purposes
    const result = message

    console.log('Send SMS') // Send to anyone
    sendSms(result)

    console.log('Regular') // Reply
    twiml.message(result)

    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(String(twiml))
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
