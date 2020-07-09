const mongoose = require("mongoose");
require('./model')
require('../user/model')
const Token = mongoose.model('Token')
const User = mongoose.model('User')
var ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment')
const _ = require('lodash')

exports.getTokenById = async (req, res) => {
  const tokenId = req.params.id

  try {
    const token = await Token.findById(tokenId)
    if (token) {
      return res.success(token)
    }
    return res.preconditionFailed('Token could not be found..')

  } catch (error) {
    return res.preconditionFailed('Error: Token with this ID does not exist. ' + error.message)
  }
}

exports.validateToken = async (req, res) => {
  const tokenId = req.params.id;
  const token = await Token.findById(tokenId)

  if (token && token.isValid) {
    return res.success(token)
  }
  return res.status(200).json({
    success: false,
    message: "Token does not exist or is invalid"
  })
}

exports.generateToken = async (req, res) => {
  const {
    companyId,
    studentId,
    reasons
  } = req.body

  const company = await User.findById(companyId)

   // set default values - if company profile is not filled out
  const companyName = _.get(company, 'companyInfo.profile.name.common') || company.email.split('@')[0]
  const companyLogo = _.get(company, 'companyInfo.profile.logo') || 'https://cocup-images.s3.eu-central-1.amazonaws.com/company-placeholder.png'

  const token = new Token({
    issuer: companyId,
    owner: studentId,
    expiresAt: moment().add(99, 'days').toDate(),
    description: {
      companyName: companyName,
      logo: companyLogo,
      reasons: reasons
    },
    seen: false,
    isValid: true,
  })

  const savedToken = await token.save()

  return res.success({
    savedToken
  })
}

exports.generateTokenForBestCandidate = async (campaign, user) => {
  const company = await User.findById(campaign.company)

  if (!company.companyInfo.profile) {
    return console.error('Company profile is not set up properly.')
  }

  const token = new Token({
    issuer: company._id,
    owner: user._id,
    expiresAt: moment().add(99, 'days').toDate(),
    description: {
      companyName: company.companyInfo.profile.name.legal,
      logo: company.companyInfo.profile.logo || campaign.slides[0].params.images.logo,
      reasons: {
        matchingSkills: user.matchingSkills,
        matchingTraits: user.matchingTraits,
      },
      ctaData: campaign.preferences.coffeeNotifications
    },
    seen: false,
    isValid: true,
  })

  const savedToken = await token.save()
  return savedToken
}

// find the token and check it's validity
// redeem only if the token is valid
exports.redeemToken = async (req, res) => {
  const tokenId = req.body.tokenId

  try {
    const updatedToken = await Token.findOneAndUpdate({
      _id: tokenId,
      owner: req.userId,
      isValid: true,
      expiresAt: {
        $gte: new Date()
      }
    }, {
      $set: {
        isValid: false,
        brewingDate: new Date(),
        brewingLocation: 'DTU'
      }
    }, {
      new: true
    })

    if (!updatedToken) {
      return res.preconditionFailed('Could not redeem this token.')
    }

    return res.success({
      tokenId: updatedToken._id
    })

  } catch (error) {
    return res.serverError(error)
  }
}

exports.getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find({
      owner: new ObjectId(req.userId)
    })

    return res.success({
      tokens
    })
  } catch (error) {
    return res.serverError(error)
  }
}

// returns tokens that were not seem by the user.
// when a token is served it is marked as seen.
exports.getNewTokens = async (req, res) => {
  try {
    const token = await Token.findOneAndUpdate({
      owner: req.userId,
      isValid: true,
      seen: false
    }, {
      $set: {
        seen: true
      }
    }, {
      new: true
    })

    return res.success({
      token
    })

  } catch (error) {
    return res.serverError(error)
  }
}



exports.generateTokenForRegistrationWithReferral = async (userId) => {

  const token = new Token({
    issuer: '5c61839f5e3766fd44faab4e',
    owner: userId,
    expiresAt: moment().add(99, 'days').toDate(),
    description: {
      companyName: 'Career2go',
      logo: '',
      ctaData: {
        text: "Thanks for using Career2go! You received this coffee because you signed up with your friend's referral code. "
      }
    },
    seen: false,
    isValid: true,
  })

  const savedToken = await token.save()
  return savedToken
}
