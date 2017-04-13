// ====================
// Models
// ====================

let Incident = require('../models/incident');

// ====================
// Helpers
// ====================

let appHelper = require('../helpers/app');
let incidentHelper = require('../helpers/incidents')

// ====================
// RESTful Methods
// ====================

//
// Get all incidents
//
exports.getAll = (req, res) => {
  Incident.find((err, incidents) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        message: 'Here are all of the Incidents currently in the database.',
        count: incidents.length,
        incidents: appHelper.stripAll(incidents, ['victim', '_id'])
      });
    }
  });
};

// //
// // Create an incident
// //
exports.add = (req, res) => {

  if (!req.date || !req.location) {
    res.json({
      success: false,
      message: 'Incidents need to be reported by a victim. Please ensure that the request includes a victim.',
      victim: victim,
    });
  } else {
    let incident = new Incident();
    let info = req.body

    incidentHelper.report(incident, info)

    incident.save((err) => {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      } else {
        res.json({
          success: true,
          message: 'A new Incident has been added to the database.',
          incident: appHelper.strip(incident, ['_id', 'location', 'date', 'victim'])
        });
      }
    });
  }
};

// //
// // Get a specific incident
// //
exports.get = (req, res) => {
  let id = req.params.id;

  Incident.find({ _id: id }, (err, incidents) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        message: `Incident for id: ${id}`,
        count: incidents.length,
        incidents: appHelper.stripAll(incidents, ['_id', 'location', 'date', 'victim', 'details'])
      });
    }
  });
};

//
// Update an incident
//
exports.update = (req, res) => {
  let id = req.params.id;
  let info = req.body

  Incident.find({ _id: id }, (err, incidents) => {
    let incident = incidents[0]

    incidentHelper.report(incident, info)

    incident.save((err) => {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      } else {
        res.json({
          success: true,
          message: `Incident for id: ${incident.id} succecfully updated`,
          incident: appHelper.strip(incident, ['_id', 'location', 'date', 'victim'])
        });
      }
    });
  });
};
