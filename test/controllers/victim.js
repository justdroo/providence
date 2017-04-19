// ====================
// Third-Party Modules
// ====================

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let Mockgoose = require('mockgoose').Mockgoose;

require('dotenv-safe').load();


// ====================
// Internal Modules
// ====================

//
// Models
//
let Incident = require('../../app/models/incident');

//
// Server
//
let server = require('../../server');

// ====================
// Setup
// ====================

//
// Assertions
//
let should = chai.should();

//
// Port
//
let port = process.env.PORT;
let address = `http://localhost:${port}`;

//
// Chai HTTP
//
chai.use(chaiHttp);

//
// Mockgoose (Test Database Connection)
//
let mockgoose = new Mockgoose(mongoose);
before((done) => {
  mockgoose.prepareStorage().then(() => {
    mongoose.createConnection(process.env.MONGODB_URI_TEST, (err) => {
      done(err);
    });
  });
});

// ====================
// Test Parameters
// ====================

let testIncidents = [
  {
    date: "1995-08-02T17:03:13.441Z",
    location: {
      city: "Little Winging",
      state: "Surrey",
      zip: 77777,
      category: "home"
    },
    context: {
      category: "dementor attack",
      reason: "muggle born",
      description: "Dementors attacked a muggle and a wizard"
    },
    victim: {
      name: "Dudley Dursley",
      anonymous: false
    }
  }, {
    date: "1999-05-02T17:03:13.441Z",
    location: {
      city: "Hogwarts Castle",
      state: "Scotland",
      zip: 77777,
      category: "school"
    },
    context: {
      category: "death eater attack",
      reason: "blood status",
      description: "Voldemort and his death eaters attacked the castle"
    },
    victim: {
      name: "Student Body",
      anonymous: true
    }
  }, {
    date: "1995-08-02T17:03:13.441Z",
    location: {
      city: "Dartmoor",
      state: "England",
      zip: 77777,
      category: "sporting event"
    },
    context: {
      category: "death eater attack",
      reason: "muggle born",
      description: "Death eaters attacked and sent up the dark mark at the Quidditch World Cup"
    },
    victim: {
      name: "Robert's Family",
      anonymous: false
    }
  }
]

let updatedVictim = {
    name: "Gandalph the White",
    anonymous: true
}

// ====================
// Testing
// ====================

//
// Reset incident in database
//
beforeEach(done => {
  Incident.remove({}, () => {
    testIncidents.forEach((incident, index) => {
      Incident.collection.insert(incident, () => {
        if (index === testIncidents.length - 1) done();
      })
    });
  });
});

//
// GET incident/:id/victim
//
describe('GET /incident/:id/victim (#get)', () => {
  it('should return a 200 status code', (done) => {
    Incident.find({}, (err, incidents) => {
      let incident = incidents[0];

      chai.request(address)
        .get(`/incident/${incident.id}/victim`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          done();
        });
    });
  });

  it('should return an incident object with "victim" property', (done) => {
    Incident.find({}, (err, incidents) => {
      let incident = incidents[0];

      chai.request(address)
        .get(`/incident/${incident.id}/victim`)
        .end((err, res) => {
          res.body.incident.should.be.a('object');
          res.body.incident.should.have.property('victim');
          res.body.incident.victim.should.be.a('object')
          done();
        });
    });
  });
});

//
// PUT incident/:id/victim
//
describe('PUT /incident/:id/victim (#update)', () => {
  it('should return a 200 status code', (done) => {
    Incident.find({}, (err, incidents) => {
      let incident = incidents[0];

      chai.request(address)
        .put(`/incident/${incident.id}/victim`)
        .send(updatedVictim)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          done();
        });
    });
  });

  it('should return the updated victim object', (done) => {
    Incident.find({}, (err, incidents) => {
      let incident = incidents[0];

      chai.request(address)
        .put(`/incident/${incident.id}/victim`)
        .send(updatedVictim)
        .end((err, res) => {
          res.body.should.have.property('incident');
          res.body.incident.should.be.a('object');
          res.body.incident.should.have.property('victim');
          res.body.incident.victim.name.should.equal(updatedVictim.name);
          res.body.incident.victim.anonymous.should.equal(updatedVictim.anonymous);
          done();
        });
    });
  });

  it('should update incident victim data in the database', (done) => {
    Incident.find({}, (err, incidents) => {
      let incident = incidents[0];

      chai.request(address)
        .put(`/incident/${incident.id}/victim`)
        .send(updatedVictim)
        .end((err, res) => {
          Incident.find({'_id':`${incident.id}`}, (err, incidents) => {
            incidents[0].victim.name.should.equal(updatedVictim.name);
            incidents[0].victim.anonymous.should.equal(updatedVictim.anonymous);
            done();
          })
        });
    });
  });
});
