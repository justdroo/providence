// ====================
// Module Dependencies
// ====================

let _       = require('lodash');
let request = require('request');

// ====================
// Helpers
// ====================

exports.welcome = 'Hello, my name is providence. I am a bot that will help you report incidents of hate and bias in your community. How can I help you today?'

exports.sendMessage = (sender, text) => {
  let messageData = { text:text }

  //ISSUE:: Messaging works, however comes back with a #100 error Sender not found??
  // shouldn't be a problem until try to get approved
  request({
	  url: 'https://graph.facebook.com/v2.6/me/messages',
	  qs: { access_token:process.env.FB_PAGE_ACCESS },
	  method: 'POST',
		json: {
		  		  recipient: {id:sender},
						message: messageData,
					}
		},
		(error, response, body) => {
			if (error) {
				console.log('Error sending messages: ', error)
			} else if (response.body.error) {
				console.log('Error: ', response.body.error)
			}
		})
}
