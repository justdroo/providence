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
    context: String,
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
