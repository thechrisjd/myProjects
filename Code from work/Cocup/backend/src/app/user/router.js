require('./model')
const express = require( "express" );
const router = express.Router();
const userController = require('./controller')
const studentController = require('./studentController')

// User CRUD
router.get('/:id', userController.getUser)
router.put('/:id/email', userController.updateEmail)
router.put('/:id/password', userController.updatePassword)
router.put('/company/:id/:section', userController.updateUser)

// students
router.put('/students', studentController.updateStudentInfo)
router.put('/students/profile/intro', studentController.updateProfile)

router.get('/ref/:referralCode')

module.exports = router
