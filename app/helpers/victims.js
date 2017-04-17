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
  incident.victim.name       = info.victim.name;
  incident.victim.anonymous  = info.victim.anonymous;
}

//
// Response keys for incidents
//
exports.responseKeys = () => {
  return ['_id', 'victim']
}
