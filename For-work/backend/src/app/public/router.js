require('../user/model')
const express = require( "express" );
const router = express.Router();
const studentController = require('../user/studentController')

router.get('/ref/:referralCode', studentController.getNameByReferralCode)

module.exports = router