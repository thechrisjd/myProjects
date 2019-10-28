const mongoose = require("mongoose");
const User = mongoose.model('User')
const validator = require('validator')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const {
    email,
    password,
    type,
    referralCode
  } = req.body

  if (!email || !password || !['student', 'company', 'vendor'].includes(type)) {
    return res.preconditionFailed('Missing a required parameter.')
  }

  try {
    let user;

    if (type === 'student') {
      // Set up user as student
      user = new User({
        type: 'student',
        email: email.toLowerCase(),
        studentInfo: {
          profile: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
          tags: {}
        },
        referralCodeAtRegistration: referralCode // set reference code if exists
      })
    } else {
      // type company or vendor - create user dynamically
      user = new User({
        type,
        email,
        [type + 'Info']: {} // initialize companyInfo or vendorInfo object
      })
    }
    // set user's password
    user.setPass(password)

    // wait for user to be saved in DB and returned
    const newUser = await user.save()

    // remove password field
    user.password = undefined

    // create a login token
    const token = generateJWT(newUser)

    return res.json({
      success: true,
      message: 'Created a new user.',
      user: newUser,
      token
    })
  } catch (error) {
    return res.preconditionFailed(error)
  }
}

const generateJWT = user => {
  if (!user._id) {
    throw Error('Missing user id when creating JWT.')
  }
  const jwtSecret = process.env.JWT_SECRET
  const token = jwt.sign({
    id: user._id,
    type: user.type,
    email: user.email,
    roles: user.roles
  }, jwtSecret, {
    expiresIn: '30 days'
  });

  return token
}

// check if the user is registered in the system and whether via email or facebook
exports.checkUser = async (req, res) => {
  let user;
  const email = req.body.email

  try {
    user = await User.findOne({
      email: email.toLowerCase()
    })
  } catch (error) {
    return res.serverError(error)
  }

  if (user) {
    console.log('User found in database.')
    if (user.facebookId) {
      console.log('User registered via facebook, id', user.facebookId)
      return res.success({
        registered: true,
        type: 'facebook'
      })
    } else {
      console.log('User registered via email')
      return res.success({
        registered: true,
        type: 'email'
      })
    }
  } else {
    console.log('User not found')
    return res.success({
      registered: false
    })
  }

}





exports.login = async (req, res) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    return res.preconditionFailed('Missing required fields.')
  }

  try {
    // Get user with password
    const user = await User.findOne({
      email: email.toLowerCase()
    }).select('+password')

    // Check user and password
    if (!user || !user.checkPass(user.password, password)) {
      return res.preconditionFailed('Incorrect username or password.')
    }
    // remove password field
    user.password = undefined

    // create login token
    const token = generateJWT(user)

    return res.json({
      success: true,
      token,
      user
    })
  } catch (e) {
    console.log('Error', e)
    return res.serverError(e)
  }
}












exports.getUser = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.notFound('User not found.')
    }
    return res.success(user)
  } catch (e) {
    return res.serverError('Something went wrong.')
  }
}

exports.updateEmail = async (req, res) => {
  const id = req.params.id
  const email = req.body.email

  if (!id) {
    return res.preconditionFailed('ID field missing.')
  }
  if (!validator.isEmail(email)) {
    return res.preconditionFailed('Email field must be a valid email address.')
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: {
        email: email
      }
    }, {
      new: true
    })
    return res.success(updatedUser)
  } catch (e) {
    return res.serverError(e)
  }
}

exports.updatePassword = async (req, res) => {
  const id = req.userId
  const {
    oldPassword,
    newPassword
  } = req.body

  if (!id) {
    return res.preconditionFailed('ID field missing.')
  }
  if (!oldPassword || !newPassword) {
    return res.preconditionFailed('Old and new password fields must be provided.')
  }

  try {
    // Get user - by default the password field is not returned by Mongo
    const user = await User.findById(id).select('+password')

    // Check password
    if (!user.checkPass(user.password, oldPassword)) {
      return res.preconditionFailed('Incorrect password.')
    }
    // Set new password
    user.setPass(newPassword)

    // Save new password
    const savedUser = await user.save()

    // Return user with new data
    return res.success(savedUser)

  } catch (e) {
    return res.serverError(e)
  }
}

// Updates company type users
exports.updateUser = async (req, res) => {
  // const id = req.params.id
  const user = await User.findById(req.userId)
  if (!user) {
    return res.preconditionFailed('User not found.')
  }

  // const userType = req.params.usertype
  const section = req.params.section
  const incomingData = req.body

  // check early for type - fail if not included
  if (!['student', 'company', 'vendor', 'admin'].includes(user.type)) {
    return res.preconditionFailed('Wrong user type.')
  }
  if (!['profile', 'tags', 'campaigns'].includes(section)) {
    return res.preconditionFailed('Wrong section name.')
  }

  try {
    const userProfileName = user.type === 'student' ? 'studentInfo' : 'companyInfo'
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: {
        [ `${userProfileName}.${section}` ]: incomingData
      }
    }, {
      new: true
    })

    // if the user object is null the update was not successfull
    if (updatedUser) {
      return res.success(updatedUser)
    } else {
      return res.preconditionFailed('Could not update the user.')
    }
  } catch (error) {
    return res.serverError(error)
  }
}
