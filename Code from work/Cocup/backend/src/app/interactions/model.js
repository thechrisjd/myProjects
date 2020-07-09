const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

const interactionSchema = new Schema({
  student: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  campaign: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  type: {
    required: true,
    type: String,
    enum: ['BUTTON', 'CAMPAIGN_VIEW', 'SLIDE_VIEW']
  },
  description: Object
}, {
  timestamps: true
})

interactionSchema.plugin(idValidator) // validate that the referenced ID exists
module.exports = mongoose.model("Interaction", interactionSchema);