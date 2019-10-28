'use strict'
const mongoose = require("mongoose");
require('./model')
const Campaign = mongoose.model('Campaign')

exports.createCampaign = async (campaignData) => {
  const campaign = new Campaign(campaignData)
  return await campaign.save()
}
