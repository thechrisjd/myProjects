require('./model')
const express = require( "express" );
const router = express.Router();
const controller = require('./controller')

// cocup.com/api/bot-campaigns/...
router.get('/:id', controller.getJobById)
router.get('/category/:category', controller.getJobs)
router.post('/', controller.createCampaign)

module.exports = router