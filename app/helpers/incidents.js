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
  if (!_.isUndefined(info.date)) {
    incident.date = info.date;
  }

  reportLocation(incident, info)

  reportContext(incident, info)
}
//
// Records data specific for location of an Incident
//
reportLocation = (incident, info) => {
  if (!_.isUndefined(info.location)) {
    if (!_.isUndefined(info.location.category)) {
      incident.location.category = info.location.category
    }

    if (!_.isUndefined(info.location.city)) {
      incident.location.city = info.location.city
    }
  }
}

//
// Records data specific for context of an Incident
//
reportContext = (incident, info) => {
  if (!_.isUndefined(info.context)) {
    if (!_.isUndefined(info.context.category)) {
      incident.context.category = info.context.category
    }

    if (!_.isUndefined(info.context.reason)) {
      incident.context.reason = info.context.reason
    }

    if (!_.isUndefined(info.context.description)) {
      incident.context.description = info.context.description
    }
  }
}

//
// Response keys for incidents
//
exports.responseKeys = () => {
  return ['_id', 'location', 'date', 'context', 'victim']
}
