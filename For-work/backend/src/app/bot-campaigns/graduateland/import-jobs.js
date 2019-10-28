// run this file with node to populate the database with jobs from csv dataset
const mongoose = require("mongoose");
const csv = require('csvtojson')
const path = require('path')
const moment = require('moment')
const repository = require('../repository')

const csvFilePath = path.join(__dirname, './data/studiejobs-23-may.csv')
mongoose.connect('mongodb+srv://dev-user:Z4YSAvN5Q25rzyN@cocupmongo-vpxvj.mongodb.net/development?retryWrites=true', {
  useNewUrlParser: true
})

const run = async () => {
  try {
    const csvJobs = await loadCsv();
    const jobDocuments = formatCSVJobs(csvJobs)
    console.log('Importing new documents:', jobDocuments.length)

    const savedJobs = await Promise.all(jobDocuments.map(job => repository.saveJobCampaign(job)))
    return console.log('Finished importing jobs to database:', savedJobs.length)

  } catch (error) {
    return console.log('Error saving jobs.', error)
  }
}

const formatCSVJobs = csvJobs => {
  const jobCampaignsFormatted = []

  for (let jobLine of csvJobs) {
    const campaignData = {
      company: null,
      type: 'job',
      enabled: false,
      name: jobLine.jobTitle,
      location: jobLine.location.split(', ')[0].replace('"', ''),
      slides: [{
        "type": "main",
        "params": {
          "jobTitle": jobLine.jobTitle,
          "companyName": jobLine.companyName,
          "header": jobLine.jobDescription.slice(0, 50).split(' ').slice(0, -1).join(' ') + '...',
          "postingDate": jobLine.date,
          "button": {
            "text": 'Learn more',
            "link": jobLine.jobUrl,
          },
          "images": {
            "logo": jobLine.logoUrl,
            "background": null
          }
        }
      },
      {
        type: 'we-are',
        params: {
          videoUrl: null, // can only be one: video or bullet points
          description: jobLine.jobDescription
        }
      },],
      preferences: {
        target: {
          studyProgress: [],
          categories: [jobLine.type],
          skills: [],
        },
        duration: {
          start: new Date(),
          end: moment().add(30, 'days').toDate()
        },
        report: [],
        coffeeNotifications: {
          text: '',
          button: {
            type: '',
            text: '',
            value: ''
          }
        },
      },
      csvData: jobLine
    }

    jobCampaignsFormatted.push(campaignData)
  }
  return jobCampaignsFormatted
}

const loadCsv = async () => {
  return await csv().fromFile(csvFilePath)
}

run()