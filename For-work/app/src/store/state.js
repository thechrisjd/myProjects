export default {
  auth: {
    token: ''
  },
  user: {},
  studentInfo: {
    profile: {
      firstName: '',
      lastName: '', 
      mobile: '',
      gender: '',
      pictureUrl: '',
      about: ''
    },

    status: {
      isAkasseMember: null,
      isUnionMember: null,
      hasOwnCompany: null,
      wantsOwnCompany: null,
      willingToTravelOutsideDk: null,
    },
  
    education: {
      university: '', 
      fieldOfStudy: '',
      studyProgression: ''
    },
    
    portfolio: {
      // cv: 'test',
      linkedinProfile: '',
      githubUsername: '',
      website: ''
    },
    
    favorites: [],

    tags: {
      locations: [],
      competences: [],
      jobTypes: [],
      industries: [],
      languages: []
    }
  },
  coffeeTokens: {
    new: null,
    current: null,
    all: [],
    total: []
  },
  version: null,
  ismobile: false
}