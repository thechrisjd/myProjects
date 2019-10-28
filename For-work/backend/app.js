const express = require('express')
const sls = require('serverless-http')
const app = express()
app.use( express.json({ extended : false }))
const bodyParser = require('body-parser')
const customResponses = require('./src/middlewares/customResponses')
const cors = require('cors')

//app.use(bodyParser.json({limit: '50mb'}))
app.use(customResponses)

// enable cors and preflight requests
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next();
})

// connect to Mongo
require('./src/config/mongoose')(app)
// init routes
require('./src/app/index')(app)

app.get('/', async (req, res, next) => {
  res.status(200).send('Hello World!')
})

module.exports.server = sls(app, {
  binary: ['image/png', 'image/gif']
})



// Previous preflight request setups (did not work)

// enable preflight
// app.options('*', cors()) // include before other routes

// enables cors
// app.use(cors({
//   'allowedHeaders': ['Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'],
//   'origin': '*',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   'preflightContinue': true
// }));
