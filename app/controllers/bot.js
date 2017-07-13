// ====================
// Third-Party Modules
// ====================

let FBMessenger = require('fb-messenger')

// ====================
// Third-Party Models
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
    //
    //Handle Postback and messaging flow
    //
    if (event.message && event.message.quick_reply) {
      let payload = JSON.parse(event.message.quick_reply.payload)
      //
      // Welcome
      //
      if (payload.question === "welcome") {
        if (payload.start === false) {
          bot.sendTextMessage(sender, "Please type hello again when you are ready to begin")
        }

        if (payload.start === true) {
          botHelper.sendAnonymousQ(sender, "Would you like to remain anonymous?")
        }
      }
      //
      //Anonymous
      //
      if (payload.question === "anonymous") {
        //TK:: record answer
        bot.sendTextMessage(sender, "Anonymous confirmed")
      }
    };
    //
    // Handle user input
    //
	  if (event.message && event.message.text) {
		  let text = event.message.text.toLowerCase();

      if (text === 'hello') {
        botHelper.sendWelcome(sender, botHelper.welcome);
      } else {
        bot.sendTextMessage(sender, 'To get started, please type "hello"')
      }
	  };
  }
  res.json({
    success: true
  });
}
