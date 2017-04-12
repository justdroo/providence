// ====================
// Modules
// ====================

var mongoose = require('mongoose');

// ====================
// Schema
// ====================

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    prompt: String
});

// ====================
// Export
// ====================

module.exports = mongoose.model('Question', QuestionSchema);
