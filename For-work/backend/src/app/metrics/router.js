require('../interactions/model.js')
require('../token/model.js')
const express = require( "express" );
const router = express.Router();
const controller = require('./controller')
const leadsController = require('./leadsController')

// /v1/metrics/*
router.get('/', controller.getMetrics)
router.get('/coffeeLeads/token', controller.findCoffeeLeads)

router.get('/leads', leadsController.getLeadsTable)


module.exports = router
