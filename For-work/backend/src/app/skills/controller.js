require('./model')
const mongoose = require("mongoose");
const Skill = mongoose.model('Skill')


// insert an array of skills into database, if it doesnt exist
exports.addSkills = async (userSkills = []) => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })

  const skillDocs = userSkills.map(skill => {
    return {
      skill
    }
  })

  try {
    const insertedSkills = await Skill.insertMany(skillDocs)
    console.log(`Successfully inserted ${insertedSkills.length} skills.`)
    return insertedSkills

  } catch (error) {
    console.log('Error adding many skills', error.errmsg)
    return []
  }
}

exports.getAllSkills = async (req, res) => {
  const allSkills = await Skill.distinct("skill")
  return res.success({
    allSkills
  })
}

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