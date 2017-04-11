
// ====================
// Modules
// ====================

let mongoose = require('mongoose');

require('dotenv-safe').load();

// ====================
// Mongoose Config
// ====================
console.log(process.env.MONGODB_URI)
// mongoose.Promise = global.Promise;
//
// mongoose.connect(process.env.MONGODB_URI);
//
// module.exports = { mongoose };
