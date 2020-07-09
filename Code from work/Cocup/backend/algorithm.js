'use strict'
const mongoose = require("mongoose");
require('./src/app/campaigns/model')
require('./src/app/user/model')
require('./src/app/token/model')
const User = mongoose.model('User')
const Campaign = mongoose.model('Campaign')
const Token = mongoose.model('Token')
const tokenController = require('./src/app/token/controller')
const _ = require('lodash')

let UserIdsGettingCoffeeToday = []
let UserIdsReceivedCoffeeThisMonth = []

module.exports.handler = async function (event, context, callback) {
  // need this code for the lambda function to quit the process when done
  context.callbackWaitsForEmptyEventLoop = false

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })

  console.log('Connected to database...')

  // get all company campaigns
  try {
    const campaigns = await Campaign.find({
      enabled: true,
      type: 'company'
    })

    // remove campaigns if one company has more
    const uniqueCampaigns = _.uniqBy(campaigns, function (campaign) {
      return campaign.company.toString();
    });

    // get this value out here
    UserIdsReceivedCoffeeThisMonth = await getUserIdsReceivedCoffeeThisMonth()

    // run job on each campaign
    const campaignHandlerResults = await Promise.all(uniqueCampaigns.map(campaign => handleCampaign(campaign)))
    console.log('\n=== Finished execution successfully ===')
    console.log(campaignHandlerResults)

    return callback(null, campaignHandlerResults)

  } catch (error) {
    console.log('\n\n=== Error during execution ===\n', error)
    return callback(error)
  }
}


// This function is run for every campaign.
// IT finds best candidate and gives them a coffee token.
const handleCampaign = async campaign => {
  console.log('Running for campaign', campaign.name)

  let response = {
    campaign: campaign.name,
    success: false,
    message: ''
  }
  const bestCandidate = await findBestCandidateForCampaign(campaign)

  if (bestCandidate) {
    response.message = 'Found best candidate for campaign'

    // give coffee to the guy
    const token = await tokenController.generateTokenForBestCandidate(campaign, bestCandidate)

    if (token) {
      response.success = true
      response.message = 'Found best candidate and successfully gave them a coffee.'
      response.bestCandidate = {
        _id: bestCandidate._id,
        email: bestCandidate.email
      }
      response.token = token._id

      return response
    }
    response.message = 'Found best candidate but could not generate a token. Candidate ID: ' + bestCandidate._id
    return response
  }
  response.message = 'No candidate found for this campaign.'
  return response
}



const findBestCandidateForCampaign = async campaign => {
  // define the primary filter criteria of the company
  const companyCategoriesArr = campaign.preferences.target.categories
  const companyStudyProgressionArr = campaign.preferences.target.studyProgress
  const companyLanguagesArr = campaign.preferences.target.languages

  // find target users - users who match by primary tags
  let query = {
    type: 'student',
    'studentInfo.tags.category': {
      $in: companyCategoriesArr // Note: use $in to match a field with an array
    },
    'studentInfo.tags.studyProgress': {
      $in: companyStudyProgressionArr
    },
  }
  // match by language if a company set this in preferences
  if (companyLanguagesArr.length > 0) {
    query['studentInfo.tags.languages'] = {
      $elemMatch: { // Note: use $elemMatch and $in to match an array with another array
        $in: companyLanguagesArr
      }
    }
  }

  let users = await User.find(query)
  // console.log('Users found for', campaign.name, ': ', users.length)

  // define the company's secondary tags
  const companySkillsArr = campaign.preferences.target.skills
  const companyTraitsArr = campaign.preferences.target.traits

  // increase filterWeight for each user when a skill/trait matches with the company's
  // skill match is worth 2 points
  // trait match is worth 1 point
  for (let user of users) {
    const userSkillsArr = user.studentInfo.tags.skills || []
    const userTraitsArr = user.studentInfo.tags.traits || []

    // add special properties to user object - used in generating coffee tokens
    user.filterWeight = 0
    user.matchingSkills = []
    user.matchingTraits = []

    // handle every skill
    for (let userSkill of userSkillsArr) {
      if (companySkillsArr.includes(userSkill)) {
        user.filterWeight += 2
        user.matchingSkills.push(userSkill)
      }
    }

    // handle every trait
    for (let userTrait of userTraitsArr) {
      if (companyTraitsArr.includes(userTrait)) {
        user.filterWeight += 1
        user.matchingTraits.push(userTrait)
      }
    }

    console.log(`User ${user.email} has matchingSkills: ${user.matchingSkills}`)
  }

  // sort these users by relevance
  users = _.orderBy(users, ['filterWeight'], ['desc'])

  // remove students who are already receiving coffee today
  const candidatesNotGettingCoffeeYet = users.filter(user => !UserIdsGettingCoffeeToday.includes(user._id.toString()))

  // remove students who received coffee this month
  const finalCandidates = candidatesNotGettingCoffeeYet.filter(user => {
    return !UserIdsReceivedCoffeeThisMonth.includes(user._id.toString())
  })

  // console.log('finalCandidates left for', campaign.name, ': ', finalCandidates.length)

  if (finalCandidates.length > 0) {
    // found best candidate
    const winningCandidate = finalCandidates[0]
    UserIdsGettingCoffeeToday.push(winningCandidate._id.toString())
    return winningCandidate
  }

  // no candidate found for this campaign
  return null
}



const getUserIdsReceivedCoffeeThisMonth = async () => {
  let date = new Date()
  date.setMonth(date.getMonth() - 1)

  try {
    const tokensGivenOutThisMonth = await Token.find({
      createdAt: {
        $gte: date
      }
    })

    const tokenOwnerIds = tokensGivenOutThisMonth.map(token => token.owner.toString())
    const uniqueTokenOwnerIds = _.uniq(tokenOwnerIds)
    return uniqueTokenOwnerIds

  } catch (error) {
    return console.log('Warning: could not load users who received coffee this month.', error)
  }
}

const logStudent = student => {
  console.log(`Student:  email: ${student.email}  job category: ${student.studentInfo.tags.category} filterWeight: ${student.filterWeight}`)
}