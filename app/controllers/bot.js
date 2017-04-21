// ====================
// Models
// ====================

// ====================
// Helpers
// ====================

let appHelper = require('../helpers/app');
let botHelper = require('../helpers/bot');

// ====================
// RESTful Methods
// ====================

//
// Webhook verify for FB
//
exports.verify = (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
};

//
// Checking to see if the bot is working
//
exports.receiveMessage = (req, res) => {
  let messaging_events = req.body.entry[0].messaging

  for (let i = 0; i < messaging_events.length; i++) {
	  let event = req.body.entry[0].messaging[i]
	  let sender = event.sender.id
    console.log(`SENDER:: ${event.sender}`)

	  if (event.message && event.message.text) {
		  let text = event.message.text

		  botHelper.sendMessage(sender, "Text received, echo: " + text.substring(0, 200))
	  }
  }
  res.json({
    success: true
  });
}
