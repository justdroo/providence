// ====================
// Models
// ====================

// ====================
// Helpers
// ====================

let appHelper = require('../helpers/app');

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
