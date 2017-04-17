// ====================
// Module Dependencies
// ====================

let _ = require('lodash');

// ====================
// Helpers
// ====================

//
// Records data on an instance of an incident
//
exports.report = (incident, info) => {
  if (!_.isUndefined(info.victim.name)) {
    incident.victim.name = info.victim.name
  }
  if (!_.isUndefined(info.victim.anonymous)) {
    incident.victim.anonymous = info.victim.anonymous
  }
  // incident.victim.anonymous  = info.victim.anonymous;
}

//
// Response keys for incidents
//
exports.responseKeys = () => {
  return ['id', 'victim']
}
