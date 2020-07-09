const jobsModel = {
  preferences: {
      target: {
          jobType: [],
          industry: [],
          studyProgress: [],
          requiredSkills : [],
          secondarySkills : [],
          skills: [],
          traits: [],
          languages: [],
          lookingFor :   {
            name: "You are",
            description: "Describe your target group",
            imagePreview: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
            template: {
              type: 'you-are',
              params: {
                description: '',
                videoUrl: ''
              }
            },
          },

      },
      duration: {
        applicationStartDate: new Date(),
        applicationEndDate: Date,
      },
      location : {
        city: [],
        address1: "",
        address2: "",
        address3: "",
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
  type: 'job',
  enabled: true,
  name : "",
  contentInformation : {
  	companyName: '',
  	jobTitle: '',
  	jobDescriptionText: '',
    jobDescriptionTasks: {
      name: "Your Tasks",
      description: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
      imagePreview: "",
      template: {
        type: 'your-tasks',
        params: {
          description: '',
          videoUrl: ''
        }
      }
    },
    companyDescription :   {
      name: "",
      description: "",
      address: "",

      imagePreview: "",
      template: {
        type: 'we-are',
        params: {
          description: '',
          videoUrl: ''
        }
      },
    },
    jobBenefits :   {
      name: "",
      description: "",
      imagePreview: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
      template: {
        type: 'we-offer',
        params: {
          description: '',
          videoUrl: ''
        }
      },
    },
    images: {
      logo: '', // change this... issue #156
      background: '' // if background null -> use the first
    },
    button: {
      text: '',
      link: ''
    },
    contactInfo :   {
      name: "",
      description: "Contact Info",
      imagePreview: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
      template: {
        type: 'contact',
        params: {
          link:"",
          email:"",
          telephone:""
        }
      }
    }
  }
}

export default jobsModel
