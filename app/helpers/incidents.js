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
  if (!_.isUndefined(info.location)) {
    incident.location = info.location;
  }

  if (!_.isUndefined(info.date)) {
    incident.date = info.date;
  }

  if (!_.isUndefined(info.context)) {
    incident.context = info.context
  }
}

//
// Response keys for incidents
//
exports.responseKeys = () => {
  return ['_id', 'location', 'date', 'context', 'victim']
}
