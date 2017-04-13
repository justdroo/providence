// ====================
// Third-Party Modules
// ====================

let express     = require('express');
let bodyParser  = require('body-parser');

require('dotenv-safe').load();

// ====================
// Internal Modules
// ====================

//
// Database
//
let db = require('./app/database/connection');

//
// Models
//
let Incident = require('./app/models/incident');
let Question = require('./app/models/question');

//
// Controllers
//
let IncidentController = require('./app/controllers/incident');

// ====================
// App Setup
// ====================

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT;

// ====================
// Routing
// ====================

let router = express.Router();

//
// Base Route
//
router.get('/', (req, res) => {
  res.json({
    message: 'Hello, my name is Providence. This is the API for Sankofa and their facebook bot',
  });
});

//
// API Routes
//
router.route('/incident')
  .get(IncidentController.getAll)
  .post(IncidentController.add);
router.route('/incident/:id')
  .get(IncidentController.get)
  .put(IncidentController.update);
router.route('/incident/:id/victim')
  .get(VictimController.get)
  .put(VictimController.update);
router.route('/incident/:id/details')
  .get(DetailsController.get)
  .put(DetailsController.update);
// router.route('/auth')
//   .post(AuthController.authenticate);
// router.route('/users')
  // .post(UserController.add);

// ====================
// Register Routes
// ====================

app.use('/', router);

// ====================
// Run Server
// ====================

app.listen(port, () => {
  console.log(`The API is currently running on localhost: ${port}.` );
});
