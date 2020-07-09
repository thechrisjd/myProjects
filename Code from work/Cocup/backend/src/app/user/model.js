const mongoose = require("mongoose");
const md5 = require("md5");
const skillController = require('../skills/controller')
const Schema = mongoose.Schema;
const shortid = require('shortid');

// set 64 chars to use for generation
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-$');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: false, // not required since FB users don't need a password
    minlength: 8,
    select: false, // to get password field in request use: Users.findOne({_id: id}).select('+password').exec(...);
  },
  type: {
    type: String,
    enum: ['student', 'company', 'vendor', 'admin'],
    required: true,
  },
  roles: [],
  facebookId: {
    type: Number,
    unique: true
  }, 
  // user's own referral code;
  // auto generated on signup
  referralCode: {
    'type': String,
    'default': shortid.generate
  },
  // The referral code used when signing up (if any)
  referralCodeAtRegistration: String,
  // If the referralCodeAtRegistration was used to give out a coffee ticket
  referralCodeRedeemed: {
    type: Boolean,
    default: false
  },
  // How many people completed their signup with this user's referral code
  referralCount: {
    type: Number,
    default: 0
  },
  studentInfo: {
    type: {
      profile: {
        firstName: String,
        lastName: String,
        dateOfBirth: Date,
        location: String,
        profilePictureUrl: String,
        telephone: Number,
        linkedinProfileUrl: String,
        portfolioUrl: String,
        CV: String
      },
      tags: {
        university: {
          type: String,
          enum: ['DTU'],
        },
        fieldOfStudy: {
          type: String,
          enum: ['Computer Science', 'Chemical Engineering', 'Data Science', 'Advanced Mathematics']
        },
        studyProgress: {
          type: String,
          enum: ['Professional Bachelor', 'Bachelor', 'Masters Degree', 'PhD', 'Graduated']
        },
        skills: [{
          title: String,
          type: {
            type: String,
            enum: ['Interest', 'Soft Skill', 'Hard Skill']
          },
          level: {
            type: Number, 
            min: 1,
            max: 10
          }
        }]
      }
    },
    required: function () { return this.type === 'student'}
  },

  companyInfo: {
    type: {
      profile: {
        name: {
          common: String,
          legal: String
        },
        contactPerson: {
          fullName: String,
          email: String
        },
        CVR: Number,
      },      
    },
    required: function () {
      return this.type === 'company'
    },
    // default: {}
  }
  }, {
    timestamps: true,
    minimize: false
  })

userSchema.methods.setPass = function (password) {
  this.password = md5(password);
};

userSchema.methods.checkPass = function (expectedPass, incomingPass) {
  return expectedPass === md5(incomingPass);
};

// whenever a student updates their skills, save the new ones to DB
userSchema.post('findOneAndUpdate', async function() {
  if (this._update.$set.studentInfo && this._update.$set.studentInfo.tags && this._update.$set.studentInfo.tags.skills) {
    const userSkills = this._update.$set.studentInfo.tags.skills
    await skillController.addSkills(userSkills)
  } 
})

module.exports = mongoose.model("User", userSchema);