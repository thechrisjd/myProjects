require('../campaigns/model')
const express = require( "express" );
const router = express.Router();
const controller = require('./controller')

// cocup.com/api/feed/
router.get('/', controller.get);
router.post('/filter', controller.filter);
router.get('/event', controller.event);
router.post('/filterEvent', controller.filterEvent);
router.get('/company', controller.company);
router.get('/search', controller.search);

module.exports = router
