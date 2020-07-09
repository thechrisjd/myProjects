'use strict'
const mongoose = require("mongoose");
const Campaign = mongoose.model('Campaign')
const Interaction = mongoose.model('Interaction')
const Token = mongoose.model('Token')
const User = mongoose.model('User')
const _ = require('lodash')

/** 
 * A lead is a student who:
 * - [x] received a coffee from the company
 * - [x] clicked on a CTO button
 * - [ ] favourited the campaign
 */
exports.getLeadsTable = async (req, res) => {
  const companyId = req.userId
  let allLeads = []

  // get ID's of each types of leads
  const coffeeLeads = await getCoffeeLeads(companyId)
  const clickLeads = await getClickLeads(companyId)

  // format leads for frontend data table
  const coffeeLeadsFormatted = formatLeads(coffeeLeads, 'Coffee')
  const clickLeadsFormatted = formatLeads(clickLeads, 'Button Click')

  // merge all leads
  allLeads = allLeads.concat(coffeeLeadsFormatted, clickLeadsFormatted)

  let results = {}

  for (let lead of allLeads) {
    if (!results.hasOwnProperty(lead.id)) {
      results[lead.id] = {
        clickCount: 0,
        coffeeCount: 0,
        total: 0,
        lead

      }
    }

    if (lead.leadType === 'Button Click') results[lead.id].clickCount++
    if (lead.leadType === 'Coffee') results[lead.id].coffeeCount++

    results[lead.id].total = results[lead.id].clickCount + results[lead.id].coffeeCount
  }

  const formattedresults = Object.keys(results).map(key => {

    const element = results[key]

    const formatted = {
      id: element.lead.id,
      clickCount: element.clickCount,
      coffeeCount: element.coffeeCount,
      total: element.total,
      email: element.lead.email,
      name: element.lead.name,
      university: element.lead.university,
      fieldOfStudy: element.lead.fieldOfStudy,
      studyProgress: element.lead.studyProgress,
      profilePicture: element.lead.profilePicture,
      linkedinProfile: element.lead.linkedinProfile,
      type: element.lead.leadType
    }
    return formatted
  })


  const sorted = _.sortBy(formattedresults, 'total')
  const reversed = sorted.reverse()

  for (let leads of reversed) {
    if (leads.clickCount > 0 && leads.coffeeCount > 0)
      leads.type = 'Coffee and Button Click'
  }

  return res.success(reversed)
}

const formatLeads = (leads = [], type = 'lead') => {
  // remove leads without profile/tags section
  const leadsFiltered = leads.filter(user => user.studentInfo && user.studentInfo.profile && user.studentInfo.tags)

  return leadsFiltered.map(user => {
    return {
      id: user._id,
      email: user.email,
      name: user.studentInfo.profile.firstName + ' ' + user.studentInfo.profile.lastName,
      university: user.studentInfo.tags.university,
      fieldOfStudy: user.studentInfo.tags.fieldOfStudy,
      studyProgress: user.studentInfo.tags.studyProgress,
      profilePicture: user.studentInfo.profile.profilePicture,
      linkedinProfile: user.studentInfo.profile.linkedinProfile,
      leadType: type
    }
  })
}

const getCoffeeLeads = async (companyId) => {
  try {
    const coffeeLeads = await Token.find({
      issuer: companyId
    }).populate('owner')

    // take the owner of the coffee token (student)
    //return coffeeLeads.map( token => token.owner.toString() )
    return coffeeLeads.map(token => token.owner)
  } catch (error) {
    console.log('Error loading coffeeLeads', error)
    return []
  }
}

const getClickLeads = async (companyId) => {
  try {
    // get all campaigns of the company for their ID
    const companyCampaigns = await Campaign.find({
      company: companyId
    })

    const companyCampaignIds = companyCampaigns.map(campaign => campaign._id.toString())

    // get button clicks for all campaigns
    const clickLeads = await Interaction.find({
      type: 'BUTTON',
      campaign: {
        $in: companyCampaignIds
      }
    }).populate('student')

    return clickLeads.map(interaction => interaction.student)
  } catch (error) {
    console.log('Error loading clickLeads', error)
    return []
  }
}