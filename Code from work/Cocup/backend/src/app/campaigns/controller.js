'use strict'
const mongoose = require("mongoose");
require('./model')
const Campaign = mongoose.model('Campaign')
require('../user/model')
const User = mongoose.model('User')
//Createing a new campaign
exports.create = async (req, res) => {
  try {
    const companyId = req.userId
    let campaignData = req.body
    campaignData.company = companyId
    const campaign = new Campaign(campaignData)
    const newCampaign = await campaign.save()
    return res.success(newCampaign)
  } catch (err) {
    console.error(err.message);
    return res.preconditionFailed(err)
  }
}

exports.get = async (req, res) => {
  const companyId = req.params.id
  Campaign.findById(companyId).populate('company').exec((err, campaign) => {
    if (err) return res.serverError(err)
    return res.success(campaign)
  })
}

exports.update = async (req, res) => {
  if (!req.body || !req.body.campaign) {
    return res.preconditionFailed('No data is provided in the request body.')
  }

  // req.userId is guaranteed to exist when a user successfully authenticates with a JWT
  const companyId = req.userId
  const campaignId = req.params.id
  const campaignData = req.body.campaign

  // delete _id as we cannot update this
  delete req.body.campaign._id

  try {
    // making sure we only take campaigns that is owned by the user
    const updatedCampaign = await Campaign.findOneAndUpdate({
      _id: campaignId,
      company: companyId
    }, campaignData, {
      new: true
    })
    if (!updatedCampaign) {
      throw new Error('Campaign with this ID not found.')
    }
    return res.success(updatedCampaign)
  } catch (error) {
    return res.serverError('The campaign could not be updated: ' + error)
  }

}

exports.toggleStatus = async (req, res) => {

  if (typeof req.body.enabled == 'undefined' || typeof req.body.enabled != 'boolean') {
    return res.preconditionFailed('Missing or wrongly formatted request parameter.')
  }

  const companyId = req.userId
  const campaignId = req.params.id

  try {
    const updatedCampaign = await Campaign.findOneAndUpdate({
      _id: campaignId,
      company: companyId
    }, {
      $set: {
        enabled: req.body.enabled
      },
    }, {
      new: true
    })

    if (!updatedCampaign) {
      return res.unprocessableEntity('This campaign could not be found.')
    }

    return res.success(updatedCampaign)

  } catch (error) {
    return res.serverError('The campaign could not be updated: ' + error)
  }
}

exports.getAll = async (req, res) => {
  const userId = req.userId
  try {
    const companyCampaigns = await Campaign.find({company : userId})
    return res.success(companyCampaigns)
  } catch (err) {
    console.error(err.message);
    return res.serverError("The campaigns could not be served: ");
  }
}

// ANTI-Duplication
// returns the urls used to get job specific data
// use it as a blacklist - jobs not to crawl again
exports.getUrlsVisited = async (req, res) => {
  let jobUrlsVisited = await Campaign.find({
    'content.jobPageTrackingUrl': {
      $exists: true
    }
  }, {
    _id: 0,
    'content.jobPageTrackingUrl': 1
  })

  jobUrlsVisited = jobUrlsVisited.map(element => element.content.jobPageTrackingUrl)
  return res.success(jobUrlsVisited)
}

exports.saveMultipleCampaigns = async (req, res) => {
  const jobs = req.body.jobs
  //console.log(jobs)

  if (!jobs || jobs.length === 0) {
    return res.preconditionFailed('Did not receive any job to save.')
  }

  const savedCampaigns = await Campaign.insertMany(jobs)
  //console.log(savedCampaigns)
  if (savedCampaigns.length === jobs.length) {
    return res.success({
      saveCount: savedCampaigns.length,
      documents: savedCampaigns
    })
  }

  return res.serverError('Fatal error. Could not save all jobs to database.')

}


exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.userId)

  // user does not have any favourites yet - backwards support old user model
  if (!user.studentInfo.favorites) {
    return res.success([])
  }

  try {
    const favorites = user.studentInfo.favorites
    const favoriteCampaigns = await Campaign.find({ _id: { $in: favorites } })
    return res.success(favoriteCampaigns)

  } catch (error) {
    return res.serverError(error)
  }

}
