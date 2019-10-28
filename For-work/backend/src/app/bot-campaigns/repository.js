'use strict'
const mongoose = require("mongoose");
require('./model')
const BotCampaign = mongoose.model('BotCampaign')

exports.saveJobCampaign = async (campaignData) => {
  try {
    const jobCampaign = new BotCampaign(campaignData)
    return await jobCampaign.save()
  } catch (error) {
    return console.log('Error saving campaign', error)
  }
}

// get only jobs that are not isEditing = true
exports.getJobs = async (category) => {
  return await BotCampaign.find({
    isEditing: {
      $exists: false
    },
    // 'csvData.jobSubCategory': category
  }).limit(50)
}

// mark job as editing
exports.getJobById = async (campaignId) => {
  return await BotCampaign.findOneAndUpdate({
    _id: campaignId,
    isEditing: {
      $exists: false
    }
  }, {
    $set: {
      isEditing: true
    }
  }, {
    new: true
  })
}

exports.deleteCampaign = async (campaignId) => {
  return await BotCampaign.findByIdAndDelete(campaignId)
}