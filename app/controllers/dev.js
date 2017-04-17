// ====================
// Models
// ====================

let Incident = require('../models/incident');

// ====================
// RESTful Methods
// ====================

//
// Remove all Incidents from DB
//
 exports.resetDB = (req, res) => {
   Incident.remove({}, (err) => {
     if (err) {
       res.json({
         success: false,
         error: err
       });
     } else {
       res.json({
         success: true,
         message: 'All Incident data removed from Dev database'
       })
     }
   })
 }


//
// Seed DB with data
//
 exports.seedDB = (req, res) => {
   
 }
