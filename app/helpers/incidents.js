// ====================
// Module Dependencies
// ====================

// let _ = require('lodash');

// ====================
// Helpers
// ====================

//
// Records data on an instance of an incident
//
exports.report = (incident, info) => {
  incident.location     = info.location;
  incident.date         = info.date;
  incident.context      = info.context
}

//
// Response keys for incidents
//
exports.responseKeys = () => {
  return ['_id', 'location', 'date', 'context', 'victim']
}
