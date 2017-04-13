// ====================
// Modules
// ====================


var mongoose = require('mongoose');

// ====================
// Schema
// ====================

var Schema = mongoose.Schema;

var IncidentSchema = new Schema({
    date: Date,
    location: String,
    victim: {
      name: String,
      anonymous: Boolean,
      demographic: {}
    },
    details: [
      {prompt: String,
      context: String,
      question_id: Schema.ObjectId}
    ]
});

// ====================
// Export
// ====================

module.exports = mongoose.model('Incident', IncidentSchema);
