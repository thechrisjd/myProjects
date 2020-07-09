const mongoose = require("mongoose");
const Schema = mongoose.Schema

const botCampaignSchema = new Schema({
  company: mongoose.Types.ObjectId,
  type: {
    type: String,
    enum: ['company', 'event', 'job', 'guide'],
    required: true
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  },
  isEditing: Boolean,
  name: String,
  location: String,
  slides: Array,
  preferences: {
    target: {
      studyProgress: [],
      categories: [],
      skills: []
    },
    duration: {
      start: Date,
      end: Date
    },
    report: [String],
    coffeeNotifications: {}
  },
  csvData: {}
}, {
  timestamps: true
})

module.exports = mongoose.model('BotCampaign', botCampaignSchema)