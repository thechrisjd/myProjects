// run this file with node to populate the database with jobs from csv dataset
const mongoose = require("mongoose");
const csv = require('csvtojson')
const path = require('path')
const moment = require('moment')
const repository = require('../repository')

// const csvFilePath = path.join(__dirname, './jobs/test-jobs.csv')
const csvFilePath = path.join(__dirname, './jobs/it-ingenioer-jobs-19-may.csv')
mongoose.connect('mongodb+srv://dev-user:Z4YSAvN5Q25rzyN@cocupmongo-vpxvj.mongodb.net/development?retryWrites=true', { useNewUrlParser: true })

const run = async () => {
  try {
    const rawJobs = await loadCsv();
    const filteredJobs = filterJobs(rawJobs)
    const jobDocuments = formatRawJobs(filteredJobs)
    console.log('Importing new documents:', jobDocuments.length)

    const savedJobs = await Promise.all(jobDocuments.map(job => repository.saveJobCampaign(job)))
    console.log('Finished importing jobs to database:', savedJobs.length)
    return 
  } catch (error) {
    return console.log('Error saving jobs.', error)
  }
}

const filterJobs = jobs => {
  let blacklist = {
    course: {
      count: 0,
      titles: []
    },
    senior: {
      count: 0,
      titles: []
    },
    experienced: {
      count: 0,
      titles: []
    },
    area: {
      count: 0
    }
  }
  const filteredJobs = jobs.filter(job => {
    if (job.jobUrl.startsWith('http://jobindexkurser.dk')) {
      blacklist.course.count++
      blacklist.course.titles.push(job.jobTitle + ' --- ' + job.jobUrl)
      return false
    }
    if (job.jobTitle.match(/senior|Senior|Sr\./g) !== null) {
      blacklist.senior.count++
      blacklist.senior.titles.push(job.jobTitle)
      return false
    }

    if (job.jobTitle.match(/erfaren|Erfaren/) !== null) {
      blacklist.experienced.count++
      blacklist.experienced.titles.push(job.jobTitle)
      return false
    }

    if (job.jobArea === 'skaane') {
      blacklist.area.count++
      return false
    }
    
    return true
  })

  console.log('Blacklist course deleted', blacklist.course.count)
  console.log('Blacklist erfaren deleted', blacklist.experienced.count)
  console.log('Blacklist senior deleted', blacklist.senior.count)
  console.log('Blacklist area deleted', blacklist.area.count)

  return filteredJobs
}

const formatRawJobs = rawJobs => {
  const jobCampaignsFormatted = []
  for (let i = 0; i < rawJobs.length; i++) {
    const jobLine = rawJobs[i];
    const campaignData = {
      company: null,
      type: 'job',
      enabled: false,
      name: jobLine.jobTitle,
      location: getAreaName(jobLine.jobArea),
      slides: [
        {
          "type": "main",
          "params": {
            "jobTitle": jobLine.jobTitle,
            "companyName": jobLine.companyName,
            "header": jobLine.description.slice(0, 50).split(' ').slice(0, -1).join(' ') + '...',
            "postingDate": jobLine.datePublished,
            "button": {
              "text": 'Learn more',
              "link": jobLine.jobUrl || jobLine.companyWebsite,
            },
            "images": {
              "logo": jobLine.logoUrl,
              "background": null
            },
            "name": 'test-name'
          }
        },
        {
          type: 'we-are',
          params: {
            videoUrl: null, // can only be one: video or bullet points
            bulletPoints: ['']
          }
        },
        {
          type: 'you-are',
          params: {
            videoUrl: null, // can only be one: video or bullet points
            bulletPoints: ['']
          }
        },
        {
          type: 'we-offer',
          params: {
            videoUrl: null, // can only be one: video or bullet points
            bulletPoints: ['']
          }
        },
        {
          type: 'your-tasks',
          params: {
            description: '',
            videoUrl: null
          }
        },
        {
          type: 'contact',
          params: {
            link:"",
            email:"",
            telephone:""
          }
        }
      ],
      preferences: {
        target: {
          studyProgress: [],
          categories: [jobLine.jobCategory + '/' + jobLine.jobSubCategory],
          skills: [],
        },
        duration: {
          start: new Date(),
          end: null
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

const getAreaName = rawName => {
  switch (rawName) {
    case 'storkoebenhavn':
      return 'Storkøbenhavn'
      break;

    case 'nordsjaelland':
      return 'Nordsjælland'
      break;

    case 'region-sjaelland':
      return 'Sjælland'
      break;
      
    case 'fyn':
      return 'Fyn'
      break;
  
    case 'region-nordjylland':
      return 'Nordjylland'
      break;
  
    case 'region-midtjylland':
      return 'Midtjylland'
      break;
  
    case 'sydjylland':
      return 'Sønderjylland'
      break;
  
    case 'bornholm':
      return 'Bornholm'
      break;
  
    default:
      return rawName
      break;
  }
}

const loadCsv = async () => {
  return await csv().fromFile(csvFilePath)
}

run()