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
exports.report = (victim, info) => {
  victim.name       = info.name;
  victim.anonymous  = info.anonymous;
}

//
// Response keys for incidents
//
exports.responseKeys = () => {
  return ['_id', 'victim']
}
