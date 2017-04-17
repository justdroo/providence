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
    location: {
      city: String,
      state: String,
      zip: Number,
      category: String
    },
    context: {
      category: String,
      reason: String,
      description: String
    },
    victim: {
      name: String,
      anonymous: Boolean,
      // demographic: {}
    }
});

// ====================
// Export
// ====================

module.exports = mongoose.model('Incident', IncidentSchema);
