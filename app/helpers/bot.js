// ====================
// Module Dependencies
// ====================

let _       = require('lodash');
let request = require('request');

// ====================
// Helpers
// ====================

exports.sendTextMessage = (sender, text) => {
  let messageData = { text:text }

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
