// ====================
// Third-Party Modules
// ====================

let FBMessenger = require('fb-messenger')

// ====================
// Models
// ====================

let bot = new FBMessenger(process.env.FB_PAGE_ACCESS)

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
// When user posts a message to Bot, this is where it gets processed
//
exports.receiveMessage = (req, res) => {
  let messaging_events = req.body.entry[0].messaging

  for (let i = 0; i < messaging_events.length; i++) {
	  let event = req.body.entry[0].messaging[i]
	  let sender = event.sender.id

	  if (event.message && event.message.text) {
		  // let text = event.message.text
		  // bot.sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
      botHelper.sendQuickReply(sender, 'Pick a color');
	  }
  }
  res.json({
    success: true
  });
}
