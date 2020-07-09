const mongoose = require("mongoose");
const User = mongoose.model('User')
const tokenController = require('../token/controller')

// used for updateing the user data when filling out the data in the intro
exports.updateProfile = async (req, res) => {

  if (!req.body.studentInfo || !req.body.studentInfo.profile) {
    return res.preconditionFailed('Wrong request body.')
  }

  if (req.userType !== 'student') {
    return res.preconditionFailed('Cannot update this user type.')
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      //req.body.user.profile
      //req.body.user.tags
      $set: {
        'studentInfo.profile': req.body.user.profile,
        'studentInfo.tags': req.body.user.tags
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


// used for updating the student's data on demand
exports.updateStudentInfo = async (req, res) => {

  if (!req.body.studentInfo) {
    return res.preconditionFailed('Wrong request body.')
  }

  if (req.userType !== 'student') {
    return res.preconditionFailed('Cannot update this user type.')
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      $set: {
        studentInfo: req.body.studentInfo
      }
    }, {
      new: true
    })

    // user signed up using a referral code
    if (updatedUser.referralCodeAtRegistration && !updatedUser.referralCodeRedeemed) {
      handleUserRegisteredWithReferralCode(updatedUser)
    }

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

// Runs every time a user who signed up with areferral code updates their profile
// and did not yet receive a coffe for this.
// If the profile is now completed the user will get the coffee here.
const handleUserRegisteredWithReferralCode = async user => {
  try {
    // 1. Get profile completion percentage
    const profileCompletionResults = calculateStudentProfileCompletion(user.studentInfo)
    console.log('Profile completion', profileCompletionResults.percentage)

    if (profileCompletionResults.percentage === 100) {
      console.log('About to give out coffee to user', user._id, 'for completing their profile')

      // 1. find the user who's referral code was used for registration
      const userWithReferralCode = await findUserByReferralCode(user.referralCodeAtRegistration)

      // 2. generate a coffee token for the referee
      await tokenController.generateTokenForRegistrationWithReferral(userWithReferralCode._id)

      // 3. bump the referral count for the user who's referral code was used
      const newReferralCount = userWithReferralCode.referralCount ? userWithReferralCode.referralCount + 1 : 1
      await User.findByIdAndUpdate(userWithReferralCode._id, {
        $set: {
          referralCount: newReferralCount
        }
      })

      // set that the user's signup token was redeemed
      await User.findByIdAndUpdate({_id : req.userId}, {
        $set: {
          referralCodeRedeemed: true,
        }
      }, {
        new: true
      })

      console.log('Successfully generated new token and updated the user')

    } else {
      console.log('Will not generate new token, profile completion % only', profileCompletionResults.percentage)
      console.log('Missing fields:', profileCompletionResults.missingProperties)
    }

  } catch (error) {
    // Function level error
    console.log('An error happened', error)
  }
}

// returns a number from 0 to 100
const calculateStudentProfileCompletion = studentInfo => {
  if (!studentInfo.profile || !studentInfo.tags) {
    return 0
  }

  // the keynames for which the fields must be checked
  const mainKeys = ['profile', 'education', 'portfolio', 'tags']
  const missingProperties = []
  let totalCount = 0
  let completedCount = 0

  for (let mainKey of mainKeys) {
    for (let propertyKey in studentInfo[mainKey]) {
      totalCount++
      if (studentInfo[mainKey][propertyKey]) {
        completedCount++
      } else {
        missingProperties.push(mainKey + '.' + propertyKey)
      }
    }
  }

  const percentage = Math.floor(100 * completedCount / totalCount)

  return {
    percentage,
    missingProperties
  }
}

const findUserByReferralCode = async referralCode => {
  // This piece of code is used to check the referral code
  // if error occurs check if the front end is sending by http or https
  //local host is using http

  const user = await User.findOne({
    referralCode : referralCode
  })

  return user
}

exports.getNameByReferralCode = async (req, res) => {
  const referralCode = req.params.referralCode
  if (!referralCode) {
    return res.preconditionFailed('Missing referral code')
  }

  const user = await findUserByReferralCode(referralCode)
  if (!user) {
    return res.preconditionFailed('Invalid referral code')
  }

  // If the user type is not student or the fields don't exist on the object
  if (!user.studentInfo || !user.studentInfo.profile || !user.studentInfo.profile.firstName) {
    return res.preconditionFailed('Wrong referral code.')
  }

  const firstName = user.studentInfo.profile.firstName || 'Career2go User'

  return res.success({
    firstName
  })
}
