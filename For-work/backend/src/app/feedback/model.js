const mongoose = require("mongoose");
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feedback: {
    required: true, 
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Feedback', feedbackSchema)