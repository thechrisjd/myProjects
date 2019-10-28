'use strict'
const mongoose = require("mongoose");
require('./model')
const Campaign = mongoose.model('Campaign')

const deleteAllCrawledJobs = async () => {
  await mongoose.connect('mongodb+srv://dev-user:Z4YSAvN5Q25rzyN@cocupmongo-vpxvj.mongodb.net/development?retryWrites=true', {
    useNewUrlParser: true
  })

  const campaigns = await Campaign.deleteMany({'content.id': {
    $exists: true
  }})

  console.log('Deleted campaigns:', campaigns.length)
}

deleteAllCrawledJobs()