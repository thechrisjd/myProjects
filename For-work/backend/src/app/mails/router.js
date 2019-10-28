const express = require( "express" );
const router = express.Router();
const emailController = require('./emailController')

router.post('/', emailController.sendMail)
router.post('/new', emailController.updatePassword)

module.exports = router