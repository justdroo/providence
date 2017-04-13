// ====================
// Models
// ====================

let Incident = require('../models/incident');

// ====================
// Helpers
// ====================



// ====================
// RESTful Methods
// ====================

//
// Get all incidents
//
// exports.getAll = (req, res) => {
//   Acronym.find((err, acronyms) => {
//     if (err) {
//       res.json({
//         success: false,
//         error: err
//       });
//     } else {
//       res.json({
//         success: true,
//         message: 'Here are all of the Excella acronyms currently in the database.',
//         count: acronyms.length,
//         acronyms: appHelper.stripAll(acronyms, ['name', 'meaning'])
//       });
//     }
//   });
// };
//
// //
// // Create an incident
// //
exports.add = (req, res) => {
  if (!req.body.victim) {
    res.json({
      success: false,
      message: 'Incidents need to be reported by a victim. Please ensure that the request includes a victim.',
      victim: req.body.victim,
    });
  } else {
    let incident = new Incident();

    incident.victim = req.body.victim;
    // incident.location = req.body.location;
    // incident.date = req.body.date;

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
          // acronym: appHelper.strip(acronym, ['name', 'meaning'])
        });
      }
    });
  }
};

// //
// // Get a specific acronym
// //
// exports.get = (req, res) => {
//   let name = req.params.name.toUpperCase();
//
//   Acronym.find({ name: name }, (err, acronyms) => {
//     if (err) {
//       res.json({
//         success: false,
//         error: err
//       });
//     } else {
//       res.json({
//         success: true,
//         message: `Here are all of the Excella acronym meanings for ${name}`,
//         count: acronyms.length,
//         acronyms: appHelper.stripAll(acronyms, ['name', 'meaning'])
//       });
//     }
//   });
// };
