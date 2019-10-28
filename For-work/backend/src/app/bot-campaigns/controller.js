const repository = require('./repository')
const campaignRepository = require('../campaigns/repository')



exports.getJobs = async (req, res) => {
  try {
    // const jobs = await repository.getJobs(req.params.category)
    const jobs = await repository.getJobs()
    return res.success(jobs)
  } catch (error) {
    return res.serverError(error)
  }
}

exports.getJobById = async (req, res) => {
  const campaignId = req.params.id
  try {
    const job = await repository.getJobById(campaignId)
    return res.success(job)
  } catch (error) {
    return res.serverError(error)
  }
}

// Deletes the bot campaign and creates a new campaign record
exports.createCampaign = async (req, res) => {
  let campaignData = req.body.campaign
  const botCampaignId = req.body.campaign._id

  await repository.deleteCampaign(botCampaignId)
  campaignData.enabled = true
  campaignData.createdAt = null
  campaignData.updatedAt = null
  delete campaignData._id

  try {
    const savedCampaign = await campaignRepository.createCampaign(campaignData)
    return res.success(savedCampaign)
  } catch (error) {
    return res.preconditionFailed(error)
  }
}
