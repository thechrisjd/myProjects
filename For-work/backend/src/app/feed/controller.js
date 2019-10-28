'use strict'
const mongoose = require("mongoose");
const Campaign = mongoose.model('Campaign')
const User = mongoose.model('User')
const repository = require('./repository')
var _ = require('lodash')

//************************************************************************************************\\
//                               Api for feed
//************************************************************************************************\\

// @route  GET v1/feed/
// @desc   creates a user feed ranked by matching skills
// @access Private

exports.get = async (req, res) => {
  try {
    const result = await Campaign.find({type : "job"})
    return res.success(result)
    /*const options = {
      page: req.query.page || 1,
      limit: 10,
      sort: {
        updatedAt: -1
      }
    }

    // loads user from DB and prepares custom query
    const mongoQuery = await getMongoQuery(req.query, req.userId)

    Campaign.paginate(mongoQuery, options, function (err, result) {
      if (err) return res.serverError(err)

      return res.success("hello")
    });*/
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
}






const getMongoQuery = async (query, userId) => {
  try {
    const user = await User.findById(userId)
    const today = new Date()

    console.log('Request params', query)

    // return array of campaign types; returns empty array if none found
    const postTypes = getJobTypes(query.type)
    console.log('post types', postTypes)


    // base query - applied to all queries
    let mongoQuery = {
      enabled: true,
      content: {$exists: true},
      // only show active campaigns
      $or: [
        {'preferences.duration.start': null },
        {'preferences.duration.start': { $lte: today } },
      ],
      $or: [
        {'preferences.duration.end': null},
        {'preferences.duration.end': { $gte: today} }
      ]
    }

    // Manual filter options - job type
    if (postTypes && postTypes.length > 0) {
      mongoQuery.type = {
        $in: postTypes
      }
    }

    // console.log('user.studentInfo.tags', user.studentInfo.tags)

    // Automatic filter options based on user settings
    if (user.studentInfo.tags.category) {
      // show only the jobs in the user's category - provided they have this configured
      mongoQuery['preferences.target.categories'] = user.studentInfo.tags.category
    }

    if (user.studentInfo.tags.jobTypes) {
      mongoQuery['content.category'] = {
        $in: user.studentInfo.tags.jobTypes
      }
    }

    // TODO get user's location
    // if (query.location) {
    //   mongoQuery.location = query.location
    // }

    if (user.studentInfo.tags.studyProgress) {
      // show only the jobs in the user's category - provided they have this configured
      mongoQuery['preferences.target.studyProgress'] = user.studentInfo.tags.studyProgress
    }

    console.log('Mongo query', mongoQuery)

    return mongoQuery
  } catch (err) {
    console.error(err.message)
  }
}

//Firgure out what this is for!!
const getJobTypes = (types = []) => {
  let postTypes = []
  //types = types.split(',')
  console.log(types)
  if (types.includes('job')) postTypes.push('job')
  if (types.includes('event')) postTypes.push('event')
  if (types.includes('company')) postTypes.push('company')

  return postTypes
}

/*

try {
  const userLanguage = usersData[0].studentInfo.tags.languages
  const userIndustry = usersData[0].studentInfo.tags.industries
  const userLocation = usersData[0].studentInfo.tags.locations
  const userJobType = usersData[0].studentInfo.tags.jobTypes
  const jobsList = await Campaign.find({"content.type" : userIndustry, "content.category" : userJobType,  "preferences.target.skills":
    {$in : userSkills}})

    jobsList.forEach(function (arrayItem) {

        const requiredSkills = arrayItem.content.skills
        const matchingSkills =  _.intersectionWith(userSkills, requiredSkills, _.isEqual)
        arrayItem.content.score = matchingSkills.length

        return arrayItem
      })

      jobsList.sort((a, b) => (a.content.score < b.content.score) ? 1 : -1)
      const settings = {
        jobTypes :  userJobType,
        jobCategories : userIndustry,
        locations : userLocation,
        languages : userLanguage
      }
      jobsList.unshift(settings)
      return res.send(jobsList)

} catch (err) {
  console.error(err.message);
  return res.status(500).send('Server error')
}

*/




//************************************************************************************************\\
//                               Api's for filtering feed
//************************************************************************************************\\

// @route   POST v1/feed/filter
// @desc   Filters the users feed
// @access Private

exports.filter = async (req, res) => {
    const filters = req.body.searchCriteria

    //Check to see if filters are sent
    if (!filters) {
      return res.status(400).json({'msg' : "Filters required"})
    }

    const id = req.userId
    //Get users profile
    const usersData = await User.find({"_id" : id})

    if (!usersData) {
      return res.status(400).json({'msg' : "User not found"})
    }
    console.log(usersData[0].studentInfo.tags)
    //Getting users skills to match job posts. Jobs are ranked by number of matches
    //const userSkills = usersData.studentInfo.tags.skills;
    //console.log(userSkills)
    /*let jobType =  filters.jobTypes
    let industry = filters.jobCategories
      // TODO: implement locations into search
      let location = filters.locations
    let language = filters.languages

    //if all filters are empty then get all jobs
    if (jobType.length === 0 && industry.length === 0 && location.length === 0 && language.length === 0) {
      try {
        const jobsList = await Campaign.find({ type : "job" })
        return res.send(jobsList)
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error')
      }
    }

    //this request object will be sent to mongo
    //the filters will be added into here
    let requestObject = {
      "preferences.target.skills": {$in : userSkills}
    }

    if (jobType.length !== 0) {
      let keyName = "preferences.target.jobType"
      requestObject[keyName] = {$in : jobType}
    }
    if (industry.length  !== 0) {
      let keyName = "preferences.target.industry"
      requestObject[keyName] = {$in : industry}
    }
    if (location.length !== 0) {
      let keyName = "preferences.location.city"
      requestObject[keyName] = {$in : location}
    }
    if (language.length !== 0) {
      let keyName = "preferences.target.languages"
      requestObject[keyName] = {$in : language}
    }

    //console.log(requestObject);
    //res.send('fdfd');
    try {
      const jobsList = await Campaign.find(requestObject)

      //if there are no jobs return error
      if (jobsList.length === 0) {
          return res.status(400).json({ msg : "There are no jobs matching your request"})
      }

      //loop over each job to match companies skills to users skills the number of matches creates a score
      jobsList.forEach(function (arrayItem) {
        const requiredSkills = arrayItem.preferences.target.skills
        const matchingSkills =  _.intersectionWith(userSkills, requiredSkills, _.isEqual)
        arrayItem.score = matchingSkills.length
        return arrayItem
      })

      //scores a ranked from highest to lowest
      jobsList.sort((a, b) => (a.score < b.score) ? 1 : -1)
      /*const settings = {
        jobTypes : jobType,
        jobCategories : industry,
        locations : location,
        languages : language
      }
      jobsList.unshift(settings)*/
      /*return res.send(jobsList)
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error')
    }*/
}

/////////////////////////////////////////////////////////////////////////////////////////////
                                  /*API for event feed */
////////////////////////////////////////////////////////////////////////////////////////////

//@root get v1/feed/event
//desc getting the events feed
//private

exports.event = async (req,res) => {
  try {
    const event = await Campaign.find({type:"event"});
    res.send(event);
  } catch (err) {
    console.error(err.message);
    res.send("server error");
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////
                                  /*API flitering event feed */
////////////////////////////////////////////////////////////////////////////////////////////

// @root get v1/feed/filterEvent
// @desc filtering the events feed
// @athu private

exports.filterEvent = async (req,res) => {
  const filters = req.body.searchCriteria;

  //Check to see if filters are sent
  if (!filters) {
    return res.status(400).json({'msg' : "Filters required"});
  }

  // If there are filters, get them.
  let date =  filters.date;
  let price = filters.price;
  let location = filters.locations;


  //if all filters are empty then get all events
  if (date === null && price === null && location === null) {
    try {
      const event = await Campaign.find({type:"event"});
      res.send(event);
    } catch (err) {
      console.error(err.message);
      res.send("server error");
    }
  }


  //this request object will be sent to mongo
  //the filters will be added into here
  let requestObject = {"type" : "event"};

  /*if (date.length !== 0) {
    let keyName = "contentInformation.category"
    requestObject[keyName] = {$in : jobType}
  }*/
  if (price) {
    let keyName = "contentInformation.price";
    requestObject[keyName] = price;
  }

  if (location.length !== 0) {
    let keyName = "preferences.location.city";
    requestObject[keyName] = {$in : location};
  }

  //console.log(requestObject);
  //res.send('hello');
  try {
    const events = await Campaign.find(requestObject);
    res.send(events);

  } catch (err) {
    console.error(err.message);
    res.send("server error");
  }

}




//////////////////////////////////////////////////////////////////
                      /*API for company feed*/
/////////////////////////////////////////////////////////////////
//@root get v1/feed/company
// desc getting the company feed
//private

exports.company = async (req, res) => {
  try {
    const company = await Campaign.find({type: "company"});
    res.send(company);
  } catch (err) {
    console.error(err);
    res.send("server error")
  }
}

/*API for seach */
///////////////////////////////////////////////////////////////////////////////////
//@root get v1/feed/seach
//desc gettig seach result
//pubilc now todo private
exports.search = async (req, res) => {


 try {
    let results = [];
    const response = await fetch(`https://${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PASSWORD}@${process.env.ELASTICSEARCH_URL}:${process.env.ELASTICSEARCH_PORT}/cocup/_search?q=${req.query.q}`)
    const resJson = await response.json();

    resJson.hits.hits.forEach((el) => {


      results.push(el._source)

    })

    if(results.length !== 0){
      res.send(results);
    }else {
      res.send("No results found");
    }

  } catch (err) {
    console.error(err);
    res.send("Server Error");

  }

}
