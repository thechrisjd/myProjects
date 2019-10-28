const express = require( "express" )
const router = express.Router()
const adminInfo = require('./controller.js')

// @ ROUTE /v1/admin/students
// @ DECS
// @ PRIVATE
router.get('/', adminInfo.findAll)

module.exports = router
