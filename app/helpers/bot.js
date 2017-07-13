// ====================
// Module Dependencies
// ====================

let _       = require('lodash');
let request = require('request');

// ====================
// Models
// ====================

// let BottyMouth = require('../models/bottyMouth')

// ====================
// Helpers
// ====================

exports.welcome = 'Hello, my name is providence. I am a bot that will help you report incidents of hate and bias in your community.'

//
// Send welcoming message and option
//
exports.sendWelcome = (sender, title) => {
  let buttons = [{
    "content_type":"text",
    "title":"Yes",
    "payload": '{"question": "welcome", "start": true}'
    }, {
    "content_type":"text",
    "title":"No",
    "payload": '{"question": "welcome", "start": false}'
    }]

  let messageData = {
    "text":title,
    "quick_replies": buttons
  }

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token:process.env.FB_PAGE_ACCESS },
    method: 'POST',
    json: {
      recipient: { id:sender },
      message: messageData,
    }
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

//
// Send anonymous questions as quick reply
//
exports.sendAnonymousQ = (sender, title, btnArray) => {
  // let botty = new BottyMouth
  // botty.colors()

  let buttons = [{
    "content_type":"text",
    "title":"Yes",
    "payload": {
      "question": "anonymous",
      "anonymous": true
    }
    }, {
    "content_type":"text",
    "title":"No",
    "payload": {
      "question": "anonymous",
      "anonymous": false
    }
    }]

  let messageData = {
    "text":title,
    "quick_replies": buttons
  }

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token:process.env.FB_PAGE_ACCESS },
    method: 'POST',
    json: {
      recipient: { id:sender },
      message: messageData,
    }
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}








//
// For sending a basic message of just text
//
// exports.sendMessage = (sender, text) => {
//   let messageData = { text:text }
//
//   //ISSUE:: Messaging works, however comes back with a #100 error Sender not found??
//   // shouldn't be a problem until try to get approved
//   request({
// 	  url: 'https://graph.facebook.com/v2.6/me/messages',
// 	  qs: { access_token:process.env.FB_PAGE_ACCESS },
// 	  method: 'POST',
// 		json: {
// 		  		  recipient: {id:sender},
// 						message: messageData,
// 					}
// 		},
// 		(error, response, body) => {
// 			if (error) {
// 				console.log('Error sending messages: ', error)
// 			} else if (response.body.error) {
// 				console.log('Error: ', response.body.error)
// 			}
// 		})
// }
