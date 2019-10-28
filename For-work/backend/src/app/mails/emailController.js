const controller = require('./emailService')
const mongoose = require("mongoose");
require('../user/model')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')

exports.sendMail = async (req, res) => {
  const userEmail = req.body.email

  if (!userEmail) {
    return res.preconditionFailed('Missing required fields.')
  }

  try {
    // Get user
    const user = await User.findOne({
      email: userEmail.toLowerCase()
    })

    // create reset password token
    const token = generateJWT(user)
    const baseUrl = 'http://cocup-app.s3-website.eu-central-1.amazonaws.com' //
    // const localhostUrl = 'http://localhost:8080'

    const options = {
      firstName: user.firstName,
      passwordChangeUrl: baseUrl + '/#/welcome/reset-password/create?jwt=' + token
    }

    controller.sendForgotPasswordMail(user.email, options)

    return res.json({
      success: true
    })

  } catch (e) {
    console.log('Error', e)
    return res.serverError(e)
  }

}

const generateJWT = user => {

  if (!user.email) {
    throw Error('Missing user email when creating JWT.')
  }
  const jwtSecret = process.env.JWT_SECRET
  const token = jwt.sign({
    id: user._id,
    email: user.email,
  }, jwtSecret, {
    expiresIn: 3600 // 1 hour
  })
  return token
}

exports.updatePassword = async (req, res) => {
  const token = req.body.token
  const newPassword = req.body.password

  try {
    const jwtSecret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, jwtSecret, function(err, decoded) {
      if (err) {
        return res.unauthorized('Failed to authenticate the token.')
      }
      return emailFromToken = decoded.email
    })

    //take email from token
    const email = decoded
    // get user
    const user = await User.findOne({
      email: email
    }).select('+password')
  
    // Set new password
    user.setPass(newPassword)
    // Save new password
    const savedUser = user.save()
    // Return user with new data
    return res.success(savedUser)

  } catch (e) {
    return res.serverError(e)
  }
}