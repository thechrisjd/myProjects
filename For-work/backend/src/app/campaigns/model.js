const mongoose = require("mongoose");
const Schema = mongoose.Schema

const campaignSchema = new Schema({
  company: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['company', 'event', 'job'],
    required: true
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  },
  name: {
    type: String,
    trim: true,
  },
  score : {
    type : String
  },
  preferences: {
    target: {
      studyProgress: [],
      categories: [],
      skills: [],
      traits: [],
      languages: [],
      industry : [],
      jobType : [],
      lookingFor : {
        type : Schema.Types.Mixed,
      }
    },
    duration: {
      start: Date,
      end: Date,
      startDay: String,
      startMonth: String,
      startTime: String,
      endTime: String,
      lastReg : String,
      applicationStartDate: Date,
      applicationEndDate: Date,
    },
    location : {
      city: Array,
      address1: String,
      address2: String,
      address3: String,
    },
    report: [String],
    coffeeNotifications: {},
    contentInformation: Array
  },
  contentInformation: {
    type : Schema.Types.Mixed,
  },
  csvData: {},
  content: {}
}, {
  timestamps: true
})
/*

{
  type: String,
  params: {
    header: String,
    date: Date,
    location: [String],
    button: {
      text: String,
      link: String
    },
    images: {
      logo: String,
      logoBackgroundColor: String,
      background: String // if background null -> use the first
    },
    target: {
      languages: [String],
      categories: [String]
    },
    contentInformation: [{
        title: String,
        text: String
      },
      {
        title: String,
        text: [String]
      },
      {
        title: String,
        text: [String]
      },
      {
        title: String,
        text: [String]
      },
      {
        title: String,
        text: [String]
      },
      {
        title: String,
        text: [String]
      }
    ],
    test : String,
    enabled: Boolean,
    type: String,
    location: String,
    name: String,
    price : String

  }
}
*/
// Add support for pagination on this model
const mongoosePaginate = require('mongoose-paginate-v2');
campaignSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Campaign', campaignSchema)
