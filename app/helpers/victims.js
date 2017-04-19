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
  if (!_.isUndefined(info.name)) {
    incident.victim.name = info.name
  }

  if (!_.isUndefined(info.anonymous)) {
    incident.victim.anonymous = info.anonymous
  }
}

//
// Response keys for incidents
//
exports.responseKeys = () => {
  return ['id', 'victim']
}
