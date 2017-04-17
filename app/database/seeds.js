//
// IMPORTANT! THIS SEEDS FILE SHOULD ONLY BE USED IN A DEV ENVIRONMENT!
//

// ====================
// Modules
// ====================

let mongoose = require('./connection');


require('dotenv-safe').load();

// ====================
// Models
// ====================

let Incident = require('../models/incident');

// ====================
// Seed Data
// ====================

let incidentData = [
  {
    location: 'Hogwarts',
    date: Date.now(),
    context: 'Deatheaters attacked the school',
    victim: {
      name: 'Harry Potter',
      anonymous: false
    }
  }
]

// ====================
// Seeding
// ====================

var seed = (model, data) => {
  model.remove({})
  // .then(() => {
  //   data.forEach((item, index) => {
  //     model.collection.insert(item).then(() => {
  //       if (index === data.length - 1) {
  //         process.exit();
  //       }
  //     });
  //   });
  // }).catch((err) => { console.log(err); });
};

console.log('Removing all incident data...');
seed(Incident, incidentData);

console.log('Done!');
