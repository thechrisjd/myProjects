const mongoose = require("mongoose");
const Interaction = mongoose.model('Interaction');
const Campaign = mongoose.model('Campaign');
const User = mongoose.model('User')
const Token = mongoose.model('Token')
const _ = require('lodash')

exports.getMetrics = async (req, res) => {

  //GENERAL COMPANY part
  const companyId = req.userId

  let campaignIds = []

  const data = {
    leads: 0,
    views: 0,
    clicks: 0,
    labels: [],
    clickSeries: [],
    viewSeries: [],
    leadSeries: []
  }

  let clicksObject = {}
  let viewsObject = {}
  let leadsObject = {}

  try {
    const campaigns = await Campaign.find({
      "company": companyId
    })

    for (let element of campaigns) {
      campaignIds.push(element._id)
    }

    const startDate = getStartDate(campaigns)

    // get all dates in between the start date and today
    var today = new Date()
    today.setDate(today.getDate())
    var dates = getDates(new Date(startDate), today);

    // convert date strings to YYYY-MM-DD and make sure there are no duplicates
    // (encoutered at time changes)
    datesConvertedAndUnique = [...new Set(convertTimestamp(dates))];

    const clickInteractions = await getClicksForCampigns(campaignIds)
    const viewInteractions = await getViewsForCampigns(campaignIds)
    const getLead = await getLeadsChartAndMetrics(companyId)
    const coffeeLeadsObject = await getCoffeeLeads(companyId)
    const coffeeLeads = coffeeLeadsObject.removedDuplicates

    const clickLeadObject = await getClickLeads(companyId)
    const clickLeads = clickLeadObject.removedDuplicates


    if (!viewInteractions || !clickInteractions) {
      return console.log("Interaction not found")
    }

    // get the dates of the clicks for an array - clickDates
    const clickDates = []
    for (let interaction of clickInteractions) {
      clickDates.push(interaction.createdAt)
    }

    const viewDates = []
    for (let interaction of viewInteractions) {
      viewDates.push(interaction.createdAt)
    }

    const coffeeleadDates = []
    for (let interaction of coffeeLeads) {
      coffeeleadDates.push(interaction.createdAt)
    }

    const clickleadDates = []
    for (let interaction of clickLeads) {
      clickleadDates.push(interaction.createdAt)
    }

    var convertedClickDates = convertTimestamp(clickDates)
    var convertedViewDates = convertTimestamp(viewDates)
    var convertedCoffeeLeadDates = convertTimestamp(coffeeleadDates)
    var convertedClickLeadDates = convertTimestamp(clickleadDates)

    // create an object with keys of dates and values relating to number of given interactions
    for (let date of datesConvertedAndUnique) {
      clicksObject[date] = 0
      viewsObject[date] = 0
      leadsObject[date] = 0
    }

    for (let date of convertedClickDates) {
      clicksObject[date]++
    }

    for (let date of convertedViewDates) {
      viewsObject[date]++
    }

    for (let date of convertedCoffeeLeadDates) {
      leadsObject[date]++
    }
    for (let date of convertedClickLeadDates) {
      leadsObject[date]++
    }

    // assign arrays to the chartist objects that is the end result
    // we will have to assign several arrays to the series attribute, or maybe not
    data.labels = Object.keys(viewsObject)
    data.clickSeries = Object.values(clicksObject)
    data.viewSeries = Object.values(viewsObject)
    data.leadSeries = Object.values(leadsObject)

    data.views = viewInteractions.length
    data.clicks = clickInteractions.length
    data.leads = getLead.length

    return res.success(data)

  } catch (error) {
    return res.serverError(error)
  }

}

const getViewsForCampigns = async (campaignIds) => {
  let interactions = await Interaction.find({
    "campaign": {
      $in: campaignIds
    },
    "type": 'CAMPAIGN_VIEW'
  })

  return interactions

}
const getClicksForCampigns = async (campaignIds) => {
  let interactions = await Interaction.find({
    "campaign": {
      $in: campaignIds
    },
    "type": 'BUTTON',
  })

  return interactions
}

const getStartDate = (campaigns) => {
  const allStartDates = []
  for (let campaign of campaigns) {
    allStartDates.push(campaign.preferences.duration.start)
  }

  var startDatesSorted = convertTimestamp(allStartDates).sort()
  return startDatesSorted[0]
}

const getLeadsChartAndMetrics = async (companyId) => {
  let allLeads = []

  // get ID's of each types of leads
  const getCoffeeLeadIds = await getCoffeeLeads(companyId)
  const coffeeLeadIds = getCoffeeLeadIds.coffeeLeadsIds
  const ClickLeadIdsObject = await getClickLeads(companyId)
  const clickLeadIds = ClickLeadIdsObject.clickLeadsIds

  // get user object by Ids
  const coffeeLeads = await getUsersById(coffeeLeadIds)
  const clickLeads = await getUsersById(clickLeadIds)

  // format leads for frontend data table
  const coffeeLeadsFormatted = formatLeads(coffeeLeads, 'Coffee')
  const clickLeadsFormatted = formatLeads(clickLeads, 'Button Click')

  // filter duplicates

  //const uniquLeadUserIds = _.uniq(allLeads)

  // merge all leads
  allLeads = allLeads.concat(coffeeLeadsFormatted, clickLeadsFormatted)
  //allLeads = uniquLeadUserIds(allLeads)

  return allLeads
}

const formatLeads = (leads = [], type = 'lead') => {
  // remove leads without profile/tags section
  const leadsFiltered = leads.filter(user => user.studentInfo && user.studentInfo.profile && user.studentInfo.tags)

  return leadsFiltered.map(user => {
    return {
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

const getUsersById = async (userIds = []) => {
  return await User.find({
    _id: {
      $in: userIds
    }
  })
}

const getCoffeeLeads = async (companyId) => {
  try {
    const coffeeLeads = await Token.find({
      issuer: companyId
    })

    const idAndDate = coffeeLeads.map(coffeeLeads => {
      return {
        id: coffeeLeads.owner.toString(),
        createdAt: coffeeLeads.createdAt
      }
    })
    const sorted = _.sortBy(idAndDate, 'createdAt')
    const removedDuplicates = _.uniqBy(sorted, 'id');

    // take the owner of the coffee token (student)
    const coffeeLeadsIds = coffeeLeads.map(token => token.owner.toString())
    return {
      removedDuplicates,
      coffeeLeadsIds
    }

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
    }).select('student')

    const clickLeadsDates = await Interaction.find({
      type: 'BUTTON',
      campaign: {
        $in: companyCampaignIds
      }
    })

    const idAndDate = clickLeadsDates.map(clickLeadsDates => {
      return {
        id: clickLeadsDates.student.toString(),
        createdAt: clickLeadsDates.createdAt
      }
    })
    const sorted = _.sortBy(idAndDate, 'createdAt')
    const removedDuplicates = _.uniqBy(sorted, 'id');

    // map and concat ObjectId from bson object to string
    clickLeadsIds = clickLeads.map(interaction => interaction.student.toString())

    return {
      clickLeads,
      clickLeadsIds,
      removedDuplicates
    }
  } catch (error) {
    console.log('Error loading clickLeads', error)
    return []
  }
}


// get all dates between two dates external function
var getDates = function (startDate, endDate) {
  var dates = [],
    currentDate = startDate,
    addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

// function to convert timestamps to YYYY-MM-DD format
var convertTimestamp = function (array) {
  var convertedArray = []
  for (let i of array) {
    convertedArray.push(i.toISOString().slice(0, 10).toString())
  }
  return convertedArray;
}

exports.findCoffeeLeads = async (req, res) => {

  // Gets all the users who owns a token that have been issued by a company
  try {
    const token = await Token.find({
      issuer: req.userId
    }).populate("owner")

    const students = token.map(token => {
      return token.owner
    })

    return res.success({
      students
    })

  } catch (error) {
    return res.serverError(error)
  }
};