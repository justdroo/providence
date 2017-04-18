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

let validIncident = testIncidents[0]

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
// #GET /incident
//

describe('GET /incident (#getAll)', () => {
  it('should return status 200', (done) => {
    chai.request(address)
      .get('/incident')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('should return a JSON object with "count" and "incidents"', (done) => {
    chai.request(address)
      .get('/incident')
      .end((err, res) => {
        res.body.should.have.property('count');
        res.body.should.have.property('incidents');
        done();
      })
  });

  it('should return all incidents as an array', (done) =>{
    chai.request(address)
      .get('/incident')
      .end((err, res) => {
        res.body.incidents.should.be.a('array');
        res.body.incidents.should.have.length(testIncidents.length);
        done();
      })
  });
});

//
// #GET /incident/:id
//

describe('GET /incident/:id (#get)', () => {
  it('should return a status code 200', (done) => {
    Incident.find({}, (err, incidents) => {
      let incident = incidents[0];

      chai.request(address)
        .get(`/incident/${incident._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true)
          done();
        });
    });
  });

  it('should return a JSON object with an incident array of one object', (done) => {
    Incident.find({}, (err, incidents) => {
      let incident = incidents[0];

      chai.request(address)
        .get(`/incident/${incident._id}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('incident')
          res.body.incident.should.have.length(1)
          res.body.incident[0].should.be.a('object')
          done();
      });
    });
  });
});

//
// #POST /incident
//

describe('POST /incident (#add)', () => {
  it('should respond with a status code 200', (done) => {
    chai.request(address)
      .post('/incident')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('should return a JSON object with "incident" property', (done) => {
    chai.request(address)
      .post('/incident')
      .send()
      .end((err, res) => {
        res.body.should.have.property('incident');
        done();
      });
  });

  it('should return the new incident as an object', (done) => {
    chai.request(address)
      .post('/incident')
      .send(validIncident)
      .end((err, res) => {
        res.body.incident.should.have.property('date');
        res.body.incident.date.should.equal(validIncident.date)
        res.body.incident.should.have.property('context');
        res.body.incident.context.category.should.equal(validIncident.context.category);
        res.body.incident.context.reason.should.equal(validIncident.context.reason);
        res.body.incident.context.description.should.equal(validIncident.context.description);
        res.body.incident.should.have.property('location');
        res.body.incident.location.city.should.equal(validIncident.location.city);
        res.body.incident.location.category.should.equal(validIncident.location.category);
        done();
      });
  });

  it('should add a new incident to the database', (done) => {
    chai.request(address)
    .post('/incident')
    .send(validIncident)
    .end((err, res) => {
      Incident.find({}, (err, incidents) => {
        incidents.length.should.equal(testIncidents.length + 1)
        done();
      });
    });
  });
});
