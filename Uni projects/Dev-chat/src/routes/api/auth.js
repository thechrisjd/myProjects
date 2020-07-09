const express = require('express')
const router = express.Router()
// All you need to do to proctect a route is to import the auth middle I created
// Add this auth middleware as an option to the route
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const {check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')



//************************************************************************************************\\
//                               Api's for Authenticate user with a token
//************************************************************************************************\\


// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})


//************************************************************************************************\\
//                            Api's for Authenticate user with email and password
//************************************************************************************************\\


// @route  Post api/auth
// @desc   Authenticate users/login
// @access Public
//is email checks to see if it is a vailded email
router.post('/', [
  check('email', 'A vaild email is required').isEmail(),
  check('password', 'Wrong password').exists()
], async (req, res) => {
  const errors = validationResult(req) // gets the results of the validation
  if (!errors.isEmpty()) { //if there are errors we will enter into this if statement
    return res.status(400).json({errors : errors.array()}) //400 bad request. errors.array places our errors into an array as there might be multiple.
  }

  const {email, password} = req.body
  try {
    //check if user exist in database
    let user = await User.findOne({email})

    //If the user exist dont let them register again.
    if (!user) {
      //Add return to set the "cant change headers header once sent" error
      return res.status(400).json({errors : [{msg : 'Invalid credentials'}]})
    }


    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
      return res.status(400).json({errors : [{msg : 'Invalid credentials'}]})
    }



    //Json web token
    // We are retriving the users id (_id) from mongodb
    //We are placing the users id in the payload of the token, this will allow the front end to not only be authenticated
    //but get access to the user information
    const payload = {
      user : {
        id : user.id
      }
    }

    // We need to sign the web token and send it to the user.
    // config.get will get the secert word
    // expiress in will exirpes in 360000 seconds
    jwt.sign(
      payload,
      config.get('jwtSecert'),
      { expiresIn : 360000},
      (err, token) => {
        if (err) {
          throw err
        }
        res.json({ token })
      })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})



module.exports = router
