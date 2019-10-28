const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

const tokenSchema = new Schema({
  issuer: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  owner: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    companyName: String,
    logo: String,
    reasons: {
      matchingSkills: Array, 
      matchingTraits: Array
    },
    ctaData: Object
  },
  expiresAt: {
    required: true, 
    type: Date
  },
  isValid: {
    required: true,
    type: Boolean
  },
  seen: {
    required: true,
    type: Boolean,
    default: false
  },
  brewingDate: Date,
  brewingLocation: {
    type: String,
    enum: ['DTU']
  }
}, {
  timestamps: true,
})

tokenSchema.plugin(idValidator) // validate that the referenced ID exists
module.exports = mongoose.model("Token", tokenSchema);