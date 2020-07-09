export const copanyProfileModel = {
  preferences: {
      target: {
        industry: [],
        skills: [],
        values: [],
        languages: []
    },
    coffeeNotifications: {
        text: '',
        button: {
          type: '',
          text: '',
          value: ''
        }
    },
    report: []
  },
  type: 'company',
  params: {
    companyName: '',
    description: '',
    employees: '',
    location: {
      address: '',
      city: ''
    },
    images: {
      logo: '',
      background: ''
    }
  }
}
