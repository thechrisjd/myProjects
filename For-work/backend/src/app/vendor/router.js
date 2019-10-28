const express = require( "express" )
const router = express.Router()
const vendors = require('./controller.js')

// @ ROUTE /v1/vendor/
// @ DECS Gets vendor information about there tokens
// @ PRIVATE
router.get('/', vendors.findAll)

module.exports = router
