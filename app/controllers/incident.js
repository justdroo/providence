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
  console.log('Request made to retrieve all incidents')
  console.log('Querying Database...')

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
        incidents: appHelper.stripAll(incidents, incidentHelper.responseKeys())
      });
    }
  });
};

// //
// // Get a specific incident
// //
exports.get = (req, res) => {
  let id = req.params.id;
  console.log(`Request made to retrieve incident ${id}`)
  console.log('Querying database...')

  Incident.find({ _id: id }, (err, incident) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        message: `Incident for id: ${id}`,
        count: incident.length,
        incident: appHelper.stripAll(incident, incidentHelper.responseKeys())
      });
    }
  });
};

// //
// // Create an incident
// //
exports.add = (req, res) => {
    console.log('Request made to create a new incident')
    console.log('Creating...')
    let incident = new Incident();
    console.log('New Incident Created')

    let info = req.body

    incidentHelper.report(incident, info)

    console.log('Saving to Database...')
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
          incident: appHelper.strip(incident, incidentHelper.responseKeys())
        });
      }
    });
    console.log('Done')
  }

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
          incident: appHelper.strip(incident, incidentHelper.responseKeys())
        });
      }
    });
  });
};
