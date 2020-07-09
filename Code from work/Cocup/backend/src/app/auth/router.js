const express = require( "express" );
const router = express.Router();
const controller = require('./contoller')

router.post('/facebook', controller.authFacebook)

module.exports = router