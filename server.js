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

//
// Controllers
//
let IncidentController = require('./app/controllers/incident');
let VictimController = require('./app/controllers/victim');
let BotController = require('./app/controllers/bot');
// let DevController = require('./app/controllers/dev'); //TK:: REMOVE BEFORE PRODUCTION

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
  .get(IncidentController.getAll) //TESTED
  .post(IncidentController.add); //TESTED
router.route('/incident/:id')
  .get(IncidentController.get) //TESTED
  .put(IncidentController.update); //TESTED
router.route('/incident/:id/victim')
  .get(VictimController.get) //TESTED
  .put(VictimController.update); //TESTED
router.route('/webhook')
  .get(BotController.verify)

// router.route('/dev') //TK:: REMOVE BEFORE PRODUCTION
  // .post(DevController.blankDB)

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
