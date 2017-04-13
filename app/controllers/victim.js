// ====================
// Module Dependencies
// ====================
let _ = require('lodash');

// ====================
// Models
// ====================

let Incident = require('../models/incident');

// ====================
// Helpers
// ====================

let appHelper = require('../helpers/app');
let victimHelper = require('../helpers/victims')
let incidentHelper= require('../helpers/incidents')

// ====================
// RESTful Methods
// ====================

//
// Get victim from an incident
//
exports.get = (req, res) => {
  let id = req.params.id;

  Incident.find({ _id: id }, (err, incident) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else if (_.isEmpty(incident.victim)) {
      res.json({
        success: false,
        error: 'Incident exists but does not contain any victim data',
        incident: appHelper.stripAll(incident, incidentHelper.responseKeys())
      })
    } else {
      res.json({
        success: true,
        message: `Victim from Incident id: ${id}`,
        victim: appHelper.stripAll(incident, victimHelper.responseKeys())
      });
    }
  });
};

//
// Update incident with victim information
//
exports.update = (req, res) => {
  let id = req.params.id;
  let info = req.body

  Incident.find({ _id: id }, (err, incidents) => {
    let incident = incidents[0]

    victimHelper.report(incident.victim, info)

    incident.save((err) => {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      } else {
        res.json({
          success: true,
          message: `Victim information for Incident id: ${incident.id} succecfully updated`,
          incident: appHelper.strip(incident, victimHelper.responseKeys())
        });
      }
    });
  });
};
