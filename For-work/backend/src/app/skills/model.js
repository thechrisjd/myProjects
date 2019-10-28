const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  skill: {
    type: String, 
    required: true,
    unique: true, 
    trim: true, 
  }, 
  relevantTitles: []
}, {
  timestamps: true,
})

module.exports = mongoose.model("Skill", skillSchema);