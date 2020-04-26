const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse;
//const { urlencoded } = require('body-parser');
const {Translate} = require('@google-cloud/translate').v2;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

process.env.GOOGLE_APPLICATION_CREDENTIALS = {
  type: process.env.GC_TYPE,
  project_id: process.env.GC_PROJECT_ID,
  private_key_id: process.env.GC_PRIVATE_KEY_ID,
  private_key: process.env.GC_PRIVATE_KEY,
  client_email: process.env.GC_CLIENT_EMAIL,
  client_id: process.env.GC_CLIENT_ID,
  auth_uri: process.env.GC_AUTH_URI,
  token_uri: process.env.GC_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GC_AUTH_PROVIDER_URL,
  client_x509_cert_url: process.env.GC_CLIENT_URL
}

const translate = new Translate();

//sendsms("testmsg");
console.log("awaiting message");

router.post('/sms', async (req, res, next) => {
    try{
    const twiml = new MessagingResponse();
  
    //print sender and message
    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    
    const {Body} = req.body;
    console.log(Body);
  
    const target = 'es';
    const [result, _] = await translate.translate(Body, target);
    console.log(result)
  
    console.log('send sms'); //send to anyone
    sendsms(result);
    console.log('regular') //reply
    twiml.message(result);
  
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
    catch(err){
      console.error(err);
      next(err);
    }
  });
  
  function sendsms(body){
      const fromnum = process.env.PN_TWIL;
      const tonum = process.env.PN_TEST;

  client.messages
    .create({
       body: body,
       from: fromnum,
       to: tonum
     })
    .then(message => console.log(message.sid));
  }

module.exports = router