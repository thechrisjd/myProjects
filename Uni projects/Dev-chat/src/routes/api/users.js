const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
//This is used to check user input is vaild. Validation middleware
const {check, validationResult } = require('express-validator')
const User = require('../../models/User')



//************************************************************************************************\\
//                            Api for registering a user 
//************************************************************************************************\\


// @route  Post api/users
// @desc   Register users
// @access Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(), //checks if name exists or if its empty
  check('email', 'A vaild email is required').isEmail(), //is email checks to see if it is a vailded email
  check('password', 'Password is required and needs to be at least 6 characters').isLength({min:6}) //makes sure the length is at a minimum. Needs more vaidation
], async (req, res) => {
  const errors = validationResult(req) // gets the results of the validation
  if (!errors.isEmpty()) { //if there are errors we will enter into this if statement
    return res.status(400).json({errors : errors.array()}) //400 bad request. errors.array places our errors into an array as there might be multiple.
  }

  const {name, email, password} = req.body
  try {
    //check if user exist in database
    let user = await User.findOne({email})

    //If the user exist dont let them register again.
    if (user) {
      //Add return to set the "cant change headers header once sent" error
      return res.status(400).json({errors : [{msg : 'User already exists'}]})
    }

    // Get users gravatar from their email
    const avatar = gravatar.url(email, {
      //this will get the users avatar from there email. s: is for image size
      // r: is for pg image, no naked images
      // d: is for default. If the user has no gravatar a default avatar will be given.
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    //this creates a new instance of the user, included all the options we required
    // this is mongooses why of connect to the required collection
    user = new User({
      name,
      email,
      avatar,
      password
    })

    //This will generate salt for our hashing function to make it harder to crack
    // 10 is the minimum recomended rounds.
    const salt = await bcrypt.genSalt(10)

    //The hash function takes the users plain text password and the salt to create a secure hash
    user.password = await bcrypt.hash(password, salt)

    // we need to call the save function to save the users data in the database
    await user.save()

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
